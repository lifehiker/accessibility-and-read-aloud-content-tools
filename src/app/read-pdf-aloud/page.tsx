import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Check, ArrowRight, FileText, Volume2, Zap } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Read PDF Aloud Online - Free PDF Text to Speech | AccessiTools",
  description:
    "Upload any PDF and have it read aloud in your browser. No app install. Uses Web Speech API with voice and speed controls. Free for 3 sessions/month.",
};

export default function ReadPdfAloudPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="bg-gradient-to-b from-purple-50 to-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Read PDF Aloud — Free Online Tool
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Upload a PDF and hear it read aloud directly in your browser. No app to install, no subscription required to start. Control playback speed and voice selection.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg">
                <Link href="/signup">
                  Try Free <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/tools/pdf-to-speech">Open Free Tool</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
              How to read a PDF aloud online
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: <FileText className="h-6 w-6 text-purple-600" />,
                  step: "1. Upload Your PDF",
                  desc: "Drag and drop or click to upload any PDF. We extract the text automatically.",
                },
                {
                  icon: <Zap className="h-6 w-6 text-indigo-600" />,
                  step: "2. Text is Extracted",
                  desc: "Our tool extracts all readable text from your PDF. For scanned PDFs, OCR is used.",
                },
                {
                  icon: <Volume2 className="h-6 w-6 text-green-600" />,
                  step: "3. Press Play",
                  desc: "Choose your voice and speed, then press play. The browser reads your PDF aloud.",
                },
              ].map((item) => (
                <Card key={item.step}>
                  <CardContent className="p-6">
                    <div className="rounded-lg bg-gray-50 p-2 w-fit mb-3">{item.icon}</div>
                    <h3 className="font-semibold text-gray-900 mb-2">{item.step}</h3>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Features</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "PDF text extraction — no install required",
                "Web Speech API uses your device's voices",
                "Playback speed: 0.5x to 2x",
                "Pause, resume, and stop controls",
                "Voice selection from available system voices",
                "Text preview before playing",
                "Works in Chrome, Firefox, Safari, and Edge",
                "Up to 10MB PDF file size",
              ].map((feat) => (
                <div key={feat} className="flex items-center gap-2 text-sm text-gray-700">
                  <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                  {feat}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">FAQ</h2>
            <Accordion type="single" collapsible className="bg-white rounded-lg border px-6">
              {[
                {
                  q: "Does this work with scanned PDFs?",
                  a: "Yes, for scanned PDFs (images inside a PDF) we use OCR to extract the text. This requires an OpenAI API key to be configured. For text-based PDFs, extraction works immediately.",
                },
                {
                  q: "What voices are available?",
                  a: "Voices come from your device's system voices via the Web Speech API. The available voices depend on your operating system and browser. Most modern devices include several English voices.",
                },
                {
                  q: "Is there a file size limit?",
                  a: "Free accounts can upload PDFs up to 10MB. This covers most documents, articles, and reports.",
                },
                {
                  q: "How is this different from Speechify?",
                  a: "Speechify is a full consumer product at $139+/year. AccessiTools is a lightweight utility focused on PDF and document reading as part of a broader accessibility toolkit. We're simpler, more affordable, and include alt text generation.",
                },
              ].map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger className="text-left font-medium text-gray-900">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <section className="py-8 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap gap-3">
              <Link href="/read-screenshots-aloud" className="text-indigo-600 hover:underline text-sm">
                Read Screenshots Aloud →
              </Link>
              <Link href="/text-to-speech-reader-no-subscription" className="text-indigo-600 hover:underline text-sm">
                Text to Speech No Subscription →
              </Link>
              <Link href="/compare/speechify-alternative" className="text-indigo-600 hover:underline text-sm">
                Speechify Alternative →
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
