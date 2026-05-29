import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { canUseAltText } from "@/lib/billing/entitlements";
import { trackAltTextUsage } from "@/lib/usage/track-usage";

interface AltTextResult {
  fileName: string;
  concise: string;
  descriptive: string;
  ecommerce: string;
}

async function generateAltTextWithOpenAI(
  imageBase64: string,
  mimeType: string
): Promise<AltTextResult> {
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
              url: `data:${mimeType};base64,${imageBase64}`,
            },
          },
          {
            type: "text",
            text: `Analyze this image and generate three versions of alt text:

1. CONCISE: A brief alt text under 125 characters, suitable for general web accessibility. Focus on the most important visual elements.

2. DESCRIPTIVE: A detailed description in 2-3 sentences covering the content, context, colors, and mood of the image.

3. ECOMMERCE: A product-focused description that highlights features, materials, colors, and selling points as if writing for an online store.

Respond with JSON only in this format:
{
  "concise": "...",
  "descriptive": "...",
  "ecommerce": "..."
}`,
          },
        ],
      },
    ],
    max_tokens: 500,
    response_format: { type: "json_object" },
  });

  const content = response.choices[0]?.message?.content ?? "{}";
  const parsed = JSON.parse(content);

  return {
    fileName: "",
    concise: parsed.concise ?? "",
    descriptive: parsed.descriptive ?? "",
    ecommerce: parsed.ecommerce ?? "",
  };
}

function generateDemoAltText(fileName: string): AltTextResult {
  const name = fileName.replace(/\.[^.]+$/, "").replace(/[-_]/g, " ");
  return {
    fileName,
    concise: `Product image showing ${name} - demo result`,
    descriptive: `This is a demo result for ${name}. Sign up to generate real AI-powered alt text using GPT-4 vision. The actual result will include detailed descriptions of colors, composition, and content.`,
    ecommerce: `Premium quality ${name}. Features carefully designed elements with professional presentation. Perfect for your ecommerce store. Sign up for actual AI-generated product descriptions.`,
  };
}

export async function POST(req: NextRequest) {
  const session = await auth();

  try {
    const formData = await req.formData();
    const files = formData.getAll("images") as File[];

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No images provided" }, { status: 400 });
    }

    // If not logged in, return demo results
    if (!session?.user?.id) {
      const demoResults = await Promise.all(
        files.slice(0, 1).map(async (file) => {
          return generateDemoAltText(file.name);
        })
      );

      return NextResponse.json({
        results: demoResults,
        demo: true,
        message: "Sign up to process all images with real AI-powered alt text generation.",
      });
    }

    const userId = session.user.id;
    const user = await db.user.findUnique({ where: { id: userId } });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check usage limits
    const usageCheck = canUseAltText(user.plan, user.altTextCreditsUsed, user.creditsResetAt);
    if (!usageCheck.allowed) {
      return NextResponse.json({ error: usageCheck.reason }, { status: 429 });
    }

    const maxFiles = Math.min(files.length, usageCheck.remaining);
    const filesToProcess = files.slice(0, maxFiles);

    const results: AltTextResult[] = [];

    for (const file of filesToProcess) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        results.push({
          fileName: file.name,
          concise: "Error: Not an image file",
          descriptive: "Error: Not an image file",
          ecommerce: "Error: Not an image file",
        });
        continue;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        results.push({
          fileName: file.name,
          concise: "Error: File too large (max 5MB)",
          descriptive: "Error: File too large (max 5MB)",
          ecommerce: "Error: File too large (max 5MB)",
        });
        continue;
      }

      // Create job record
      const job = await db.assetJob.create({
        data: {
          userId,
          type: "ALT_TEXT",
          status: "PROCESSING",
          inputText: file.name,
        },
      });

      try {
        let result: AltTextResult;

        if (process.env.OPENAI_API_KEY) {
          const bytes = await file.arrayBuffer();
          const base64 = Buffer.from(bytes).toString("base64");
          result = await generateAltTextWithOpenAI(base64, file.type);
          result.fileName = file.name;
        } else {
          // Demo mode without OpenAI key
          result = generateDemoAltText(file.name);
        }

        const metaJson = JSON.stringify({
          concise: result.concise,
          descriptive: result.descriptive,
          ecommerce: result.ecommerce,
        });

        await db.assetJob.update({
          where: { id: job.id },
          data: {
            status: "DONE",
            outputText: result.concise,
            metaJson,
          },
        });

        // Store file reference
        await db.assetFile.create({
          data: {
            jobId: job.id,
            url: `upload:${file.name}`,
            mimeType: file.type,
            fileName: file.name,
            fileSize: file.size,
          },
        });

        // Track usage
        await trackAltTextUsage(userId, job.id);

        results.push(result);
      } catch (err) {
        console.error("[alt-text] Job failed:", err);
        await db.assetJob.update({
          where: { id: job.id },
          data: { status: "FAILED" },
        });
        results.push({
          fileName: file.name,
          concise: "Error: Failed to generate alt text",
          descriptive: "Error: Failed to generate alt text",
          ecommerce: "Error: Failed to generate alt text",
        });
      }
    }

    return NextResponse.json({ results, demo: false });
  } catch (err) {
    console.error("[alt-text] Error:", err);
    return NextResponse.json(
      { error: "Failed to process images" },
      { status: 500 }
    );
  }
}
