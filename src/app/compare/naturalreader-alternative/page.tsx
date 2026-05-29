import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NaturalReader Alternative - Better Screenshot & Alt Text Tools | AccessiTools",
  description:
    "Looking for a NaturalReader alternative? AccessiTools adds screenshot OCR and alt text generation alongside document reading. Free to start.",
};

const comparison = [
  { feature: "Free tier", ours: "3 sessions/month", theirs: "Very limited voices" },
  { feature: "Read PDFs aloud", ours: true, theirs: true },
  { feature: "Screenshot OCR + playback", ours: true, theirs: false },
  { feature: "Alt text generation for images", ours: true, theirs: false },
  { feature: "Batch image processing", ours: true, theirs: false },
  { feature: "CSV export", ours: true, theirs: false },
  { feature: "Browser-based (no install)", ours: true, theirs: "Partially" },
  { feature: "Ecommerce tools", ours: true, theirs: false },
  { feature: "Speed control", ours: "0.5x to 2x", theirs: true },
];

export default function NaturalReaderAlternativePage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="bg-gradient-to-b from-gray-50 to-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              NaturalReader Alternative with Better Accessibility Tools
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              NaturalReader handles document reading well, but lacks screenshot OCR and has no alt text generation. AccessiTools combines both workflows into one focused utility.
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
                    <th className="p-4 text-center font-semibold text-gray-500">NaturalReader</th>
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

        <section className="py-12 px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">One tool for both workflows</h2>
            <p className="text-gray-600 mb-6">
              Alt text for your images + read aloud for your documents. Both in one place, starting free.
            </p>
            <Button asChild size="lg">
              <Link href="/signup">Create Free Account</Link>
            </Button>
          </div>
        </section>

        <section className="py-8 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap gap-3">
              <Link href="/compare/speechify-alternative" className="text-indigo-600 hover:underline text-sm">vs Speechify →</Link>
              <Link href="/read-pdf-aloud" className="text-indigo-600 hover:underline text-sm">Read PDF Aloud →</Link>
              <Link href="/alt-text-generator" className="text-indigo-600 hover:underline text-sm">Alt Text Generator →</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
