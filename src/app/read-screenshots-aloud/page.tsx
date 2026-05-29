import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Read Screenshots Aloud Online - OCR + Text to Speech | AccessiTools",
  description:
    "Upload a screenshot or image with text, extract the content with OCR, and have it read aloud in your browser. Free to try — no subscription needed to start.",
};

export default function ReadScreenshotsAloudPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="bg-gradient-to-b from-blue-50 to-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Read Screenshots Aloud
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Take a screenshot of any article, email, or document. Upload it here and we&apos;ll extract the text using OCR and read it aloud in your browser — no copying and pasting required.
            </p>
            <Button asChild size="lg">
              <Link href="/signup">
                Try Free <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
              When you&apos;d use this
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "Screenshot of a long article you want to listen to while commuting",
                "Image of a document you received that isn't selectable text",
                "Photo of printed material you want to hear",
                "Screenshot of a social media thread",
                "Image of text that can't be copied from the original source",
                "Email screenshot forwarded without the original text",
              ].map((use) => (
                <div key={use} className="flex items-start gap-2 text-sm text-gray-700 bg-gray-50 rounded-lg p-3">
                  <Check className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                  {use}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">How it works</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                "Take a screenshot (Cmd+Shift+4 on Mac, Win+Shift+S on Windows)",
                "Upload the screenshot to AccessiTools",
                "AI extracts all visible text via OCR",
                "Press Play to hear it read aloud",
              ].map((step, i) => (
                <div key={i} className="text-center">
                  <div className="w-10 h-10 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center mx-auto mb-3">
                    {i + 1}
                  </div>
                  <p className="text-sm text-gray-700">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Start reading screenshots aloud</h2>
            <Button asChild size="lg">
              <Link href="/signup">Create Free Account</Link>
            </Button>
            <p className="text-sm text-gray-500 mt-3">3 read-aloud sessions free/month. No credit card.</p>
          </div>
        </section>

        <section className="py-8 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap gap-3">
              <Link href="/read-pdf-aloud" className="text-indigo-600 hover:underline text-sm">Read PDF Aloud →</Link>
              <Link href="/text-to-speech-reader-no-subscription" className="text-indigo-600 hover:underline text-sm">No Subscription TTS →</Link>
              <Link href="/compare/naturalreader-alternative" className="text-indigo-600 hover:underline text-sm">NaturalReader Alternative →</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
