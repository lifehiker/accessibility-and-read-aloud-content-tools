import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Speechify Alternative - Read PDFs Aloud Without $139/Year | AccessiTools",
  description:
    "Looking for a Speechify alternative? AccessiTools reads PDFs and screenshots aloud with a free tier and Pro at $19/month — no $139/year subscription needed.",
};

const comparison = [
  { feature: "Free tier available", ours: true, theirs: "Very limited" },
  { feature: "Monthly pricing option", ours: "$19/month", theirs: "$139+/year" },
  { feature: "Read PDFs aloud", ours: true, theirs: true },
  { feature: "Screenshot OCR + read aloud", ours: true, theirs: false },
  { feature: "Alt text generation for images", ours: true, theirs: false },
  { feature: "Batch image processing", ours: true, theirs: false },
  { feature: "CSV export for alt text", ours: true, theirs: false },
  { feature: "Works in browser, no install", ours: true, theirs: "App required for best experience" },
  { feature: "Ecommerce workflow tools", ours: true, theirs: false },
];

export default function SpeechifyAlternativePage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="bg-gradient-to-b from-gray-50 to-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              Speechify Alternative — Read Aloud Without $139/Year
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Speechify is great at what it does, but at $139–200/year, it&apos;s overkill if you just need to read PDFs and documents aloud. AccessiTools starts free and costs $19/month when you need more.
            </p>
            <Button asChild size="lg">
              <Link href="/signup">Try AccessiTools Free</Link>
            </Button>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Feature Comparison</h2>
            <div className="bg-white rounded-lg border overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="text-left p-4 font-semibold">Feature</th>
                    <th className="p-4 text-center font-semibold text-indigo-700">AccessiTools</th>
                    <th className="p-4 text-center font-semibold text-gray-500">Speechify</th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((row, i) => (
                    <tr key={row.feature} className={i % 2 === 0 ? "" : "bg-gray-50"}>
                      <td className="p-4 text-gray-700">{row.feature}</td>
                      <td className="p-4 text-center">
                        {typeof row.ours === "boolean" ? (
                          row.ours ? <Check className="h-4 w-4 text-green-500 mx-auto" /> : <X className="h-4 w-4 text-gray-300 mx-auto" />
                        ) : <span className="text-indigo-700 font-medium">{row.ours}</span>}
                      </td>
                      <td className="p-4 text-center text-gray-500">
                        {typeof row.theirs === "boolean" ? (
                          row.theirs ? <Check className="h-4 w-4 text-green-500 mx-auto" /> : <X className="h-4 w-4 text-gray-300 mx-auto" />
                        ) : row.theirs}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">When AccessiTools is the right choice</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "You primarily read PDFs, not full libraries of content",
                "You also need alt text generation for images",
                "You're an ecommerce seller or content creator",
                "You want pay-as-you-need pricing, not annual lock-in",
                "You need screenshot OCR + read aloud in one tool",
                "You need CSV export for accessibility compliance",
              ].map((point) => (
                <div key={point} className="flex items-start gap-2 text-sm text-gray-700">
                  <Check className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                  {point}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Try it free — no card required</h2>
            <Button asChild size="lg">
              <Link href="/signup">Create Free Account</Link>
            </Button>
          </div>
        </section>

        <section className="py-8 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap gap-3">
              <Link href="/compare/naturalreader-alternative" className="text-indigo-600 hover:underline text-sm">vs NaturalReader →</Link>
              <Link href="/read-pdf-aloud" className="text-indigo-600 hover:underline text-sm">Read PDF Aloud →</Link>
              <Link href="/text-to-speech-reader-no-subscription" className="text-indigo-600 hover:underline text-sm">No Subscription TTS →</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
