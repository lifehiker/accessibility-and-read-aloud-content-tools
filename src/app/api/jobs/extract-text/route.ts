import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { canUseReadAloud } from "@/lib/billing/entitlements";
import { trackReadAloudUsage } from "@/lib/usage/track-usage";

async function extractTextFromPdf(buffer: Buffer): Promise<string> {
  const pdfParse = await import("pdf-parse");
  const data = await pdfParse.default(buffer);
  return data.text;
}

async function extractTextFromImageWithOpenAI(
  base64: string,
  mimeType: string
): Promise<string> {
  const { default: OpenAI } = await import("openai");
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "image_url",
            image_url: {
              url: `data:${mimeType};base64,${base64}`,
            },
          },
          {
            type: "text",
            text: "Please extract and transcribe all text visible in this image. Return only the extracted text, preserving the original layout as much as possible. If there is no text, describe what you see briefly.",
          },
        ],
      },
    ],
    max_tokens: 2000,
  });

  return response.choices[0]?.message?.content ?? "";
}

export async function POST(req: NextRequest) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }

  const userId = session.user.id;
  const user = await db.user.findUnique({ where: { id: userId } });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Check usage limits
  const usageCheck = canUseReadAloud(user.plan, user.readAloudSessionsUsed, user.creditsResetAt);
  if (!usageCheck.allowed) {
    return NextResponse.json({ error: usageCheck.reason }, { status: 429 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const pastedText = formData.get("text") as string | null;

    // Handle pasted text
    if (pastedText) {
      const job = await db.assetJob.create({
        data: {
          userId,
          type: "READ_ALOUD",
          status: "DONE",
          inputText: pastedText.slice(0, 100) + "...",
          outputText: pastedText,
        },
      });

      await trackReadAloudUsage(userId, job.id);

      return NextResponse.json({ text: pastedText, jobId: job.id });
    }

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: "File too large (max 10MB)" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const job = await db.assetJob.create({
      data: {
        userId,
        type: "READ_ALOUD",
        status: "PROCESSING",
        inputText: file.name,
      },
    });

    let extractedText = "";

    try {
      if (file.type === "application/pdf") {
        extractedText = await extractTextFromPdf(buffer);

        // If PDF has no extractable text, try OCR
        if (!extractedText.trim() && process.env.OPENAI_API_KEY) {
          const base64 = buffer.toString("base64");
          extractedText = await extractTextFromImageWithOpenAI(base64, file.type);
        }
      } else if (file.type.startsWith("image/")) {
        if (process.env.OPENAI_API_KEY) {
          const base64 = buffer.toString("base64");
          extractedText = await extractTextFromImageWithOpenAI(base64, file.type);
        } else {
          extractedText = `Demo: OCR would extract text from ${file.name}. Add an OpenAI API key to enable real OCR.`;
        }
      } else {
        return NextResponse.json({ error: "Unsupported file type. Please upload a PDF or image." }, { status: 400 });
      }

      if (!extractedText.trim()) {
        extractedText = "No readable text found in this file.";
      }

      await db.assetJob.update({
        where: { id: job.id },
        data: { status: "DONE", outputText: extractedText },
      });

      await db.assetFile.create({
        data: {
          jobId: job.id,
          url: `upload:${file.name}`,
          mimeType: file.type,
          fileName: file.name,
          fileSize: file.size,
        },
      });

      await trackReadAloudUsage(userId, job.id);

      return NextResponse.json({ text: extractedText, jobId: job.id });
    } catch (err) {
      console.error("[extract-text] Error:", err);
      await db.assetJob.update({
        where: { id: job.id },
        data: { status: "FAILED" },
      });
      return NextResponse.json({ error: "Failed to extract text from file" }, { status: 500 });
    }
  } catch (err) {
    console.error("[extract-text] Error:", err);
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}
