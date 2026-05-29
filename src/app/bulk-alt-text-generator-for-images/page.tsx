import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bulk Alt Text Generator for Images - Batch Process Hundreds | AccessiTools",
  description:
    "Generate alt text for hundreds of images at once. Upload in bulk, get AI-powered descriptions for each image, and export as CSV. Free to try — no card required.",
};

export default function BulkAltTextPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="bg-gradient-to-b from-indigo-50 to-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Bulk Alt Text Generator for Images
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Stop adding alt text one image at a time. Upload your entire image batch, let AI describe each one, and export all results as a single CSV file.
            </p>
            <Button asChild size="lg">
              <Link href="/signup">
                Start Batch Processing Free <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
            <p className="text-sm text-gray-500 mt-3">10 images free. Pro: 500/month at $19/mo.</p>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
              Why batch alt text matters
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">The old way</h3>
                <ul className="space-y-2 text-gray-600 text-sm">
                  {[
                    "Open each image individually",
                    "Think of a description",
                    "Write it in your CMS or product page",
                    "Repeat 500 more times",
                    "Get 20% through before giving up",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="text-red-400">✗</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">With AccessiTools</h3>
                <ul className="space-y-2 text-gray-600 text-sm">
                  {[
                    "Drag and drop all images at once",
                    "AI generates 3 variants per image",
                    "Edit any result inline",
                    "Export everything as a CSV",
                    "Done in minutes, not days",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Common use cases</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
              {[
                "Shopify product image migration",
                "Website accessibility audit",
                "ADA compliance remediation",
                "Etsy listing optimization",
                "Social media image archives",
                "Marketing image libraries",
                "Blog post image updates",
                "Google Image SEO improvement",
                "Instagram post archives",
              ].map((uc) => (
                <div key={uc} className="bg-white rounded-lg border p-4 text-sm text-gray-700">
                  {uc}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-white text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to batch process your images?</h2>
            <Button asChild size="lg">
              <Link href="/signup">Get Started Free</Link>
            </Button>
            <p className="text-sm text-gray-500 mt-3">
              Free: 10 images lifetime. Pro: 500/month. Team: 2,000/month.
            </p>
          </div>
        </section>

        <section className="py-8 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap gap-3">
              <Link href="/alt-text-generator-for-ecommerce" className="text-indigo-600 hover:underline text-sm">
                Ecommerce Alt Text →
              </Link>
              <Link href="/alt-text-generator" className="text-indigo-600 hover:underline text-sm">
                Alt Text Generator →
              </Link>
              <Link href="/tools/image-alt-text-generator" className="text-indigo-600 hover:underline text-sm">
                Free Tool →
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
