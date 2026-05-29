import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Canva Alt Text Alternative - Standalone Batch Alt Text Generator | AccessiTools",
  description:
    "Looking for a Canva alt text alternative? AccessiTools generates alt text for any image, not just Canva designs. Batch process and export CSV without a design tool.",
};

const comparison = [
  { feature: "Works with any image", ours: true, theirs: "Canva designs only" },
  { feature: "Batch processing", ours: true, theirs: false },
  { feature: "CSV export", ours: true, theirs: false },
  { feature: "3 alt text variants per image", ours: true, theirs: false },
  { feature: "Ecommerce-focused variant", ours: true, theirs: false },
  { feature: "Works outside Canva", ours: true, theirs: false },
  { feature: "Shopify/WooCommerce workflow", ours: true, theirs: false },
  { feature: "Read PDFs aloud", ours: true, theirs: false },
  { feature: "Screenshot OCR", ours: true, theirs: false },
];

export default function CanvaAltTextAlternativePage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="bg-gradient-to-b from-gray-50 to-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              Canva Alt Text Alternative — Standalone Alt Text Generator
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Canva&apos;s alt text feature is convenient if you&apos;re already in Canva, but it only works with Canva designs. AccessiTools generates alt text for any image, in batch, with CSV export — no design tool needed.
            </p>
            <Button asChild size="lg">
              <Link href="/signup">Try AccessiTools Free</Link>
            </Button>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
              Key differences
            </h2>
            <div className="bg-white rounded-lg border overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="text-left p-4 font-semibold">Feature</th>
                    <th className="p-4 text-center font-semibold text-indigo-700">AccessiTools</th>
                    <th className="p-4 text-center font-semibold text-gray-500">Canva</th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((row, i) => (
                    <tr key={row.feature} className={i % 2 === 0 ? "" : "bg-gray-50"}>
                      <td className="p-4 text-gray-700">{row.feature}</td>
                      <td className="p-4 text-center">
                        {typeof row.ours === "boolean" ? (
                          row.ours ? <Check className="h-4 w-4 text-green-500 mx-auto" /> : <X className="h-4 w-4 text-gray-300 mx-auto" />
                        ) : row.ours}
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
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
              The real problem with Canva alt text
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Canva&apos;s alt text feature is useful for adding descriptions to designs you&apos;ve made in Canva. But most accessibility and ecommerce workflows involve existing product photos, website images, and screenshots — not Canva designs.
              </p>
              <p>
                AccessiTools is built specifically for this: upload any image from anywhere, get three ready-to-use alt text variants, edit inline, and export as CSV for bulk upload to your platform of choice.
              </p>
              <p>
                If you manage 200 product images in a Shopify store, Canva&apos;s alt text feature won&apos;t help you. AccessiTools will.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Generate alt text for any image</h2>
            <Button asChild size="lg">
              <Link href="/signup">Create Free Account — 10 Images Free</Link>
            </Button>
          </div>
        </section>

        <section className="py-8 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap gap-3">
              <Link href="/alt-text-generator-for-ecommerce" className="text-indigo-600 hover:underline text-sm">Ecommerce Alt Text →</Link>
              <Link href="/bulk-alt-text-generator-for-images" className="text-indigo-600 hover:underline text-sm">Bulk Alt Text Generator →</Link>
              <Link href="/tools/image-alt-text-generator" className="text-indigo-600 hover:underline text-sm">Free Tool →</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
