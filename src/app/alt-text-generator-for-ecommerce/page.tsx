import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, ArrowRight, ShoppingBag, TrendingUp, Download } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alt Text Generator for Ecommerce - Shopify & WooCommerce | AccessiTools",
  description:
    "Generate product image alt text in bulk for Shopify, WooCommerce, and Etsy stores. Export as CSV for bulk import. Free to start — 10 images free, no card required.",
};

export default function AltTextEcommercePage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="bg-gradient-to-b from-indigo-50 to-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Alt Text Generator for Ecommerce
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Stop writing alt text for product images manually. Upload your product photos in bulk, get ecommerce-optimized descriptions, and export as CSV for Shopify or WooCommerce.
            </p>
            <Button asChild size="lg">
              <Link href="/signup">
                Try Free — 10 Images No Card <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
              Built for ecommerce workflows
            </h2>
            <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
              Ecommerce teams have hundreds or thousands of product images. Writing alt text manually is tedious, error-prone, and time-consuming. We automated the whole workflow.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: <ShoppingBag className="h-6 w-6 text-indigo-600" />,
                  title: "Ecommerce-Focused Variant",
                  description: "Every image gets a product-focused alt text that describes materials, features, colors, and selling points — not just what the image shows.",
                },
                {
                  icon: <Download className="h-6 w-6 text-green-600" />,
                  title: "CSV Export for Bulk Import",
                  description: "Export all alt text as a CSV file. Import directly into Shopify, WooCommerce, BigCommerce, or any platform that accepts bulk product CSV imports.",
                },
                {
                  icon: <TrendingUp className="h-6 w-6 text-purple-600" />,
                  title: "SEO + Accessibility Together",
                  description: "Product image alt text helps Google understand your images for image search, while also making your store accessible to screen reader users.",
                },
              ].map((item) => (
                <Card key={item.title}>
                  <CardContent className="p-6">
                    <div className="rounded-lg bg-gray-50 p-2 w-fit mb-4">{item.icon}</div>
                    <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
              Platform compatibility
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {["Shopify", "WooCommerce", "BigCommerce", "Etsy", "Squarespace", "Magento"].map((platform) => (
                <div key={platform} className="bg-white rounded-lg border px-4 py-3 text-center font-medium text-gray-700">
                  {platform}
                </div>
              ))}
            </div>
            <p className="text-center text-sm text-gray-500 mt-4">
              CSV export works with any platform that accepts bulk product updates.
            </p>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Features</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "Batch upload — process 50+ images at once",
                "3 variants: concise, descriptive, ecommerce",
                "Inline editing before export",
                "CSV export ready for Shopify bulk import",
                "Per-image copy to clipboard",
                "Supports JPG, PNG, WebP formats",
                "File size up to 5MB per image",
                "Job history — revisit previous generations",
              ].map((feat) => (
                <div key={feat} className="flex items-center gap-2 text-sm text-gray-700">
                  <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                  {feat}
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <Button asChild size="lg">
                <Link href="/signup">Start Free — 10 Images No Card Required</Link>
              </Button>
              <p className="text-sm text-gray-500 mt-2">
                Pro plan: 500 images/month at $19/month
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Related pages</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/bulk-alt-text-generator-for-images" className="text-indigo-600 hover:underline text-sm">
                Bulk Alt Text Generator →
              </Link>
              <Link href="/alt-text-generator" className="text-indigo-600 hover:underline text-sm">
                Alt Text Generator →
              </Link>
              <Link href="/compare/canva-alt-text-alternative" className="text-indigo-600 hover:underline text-sm">
                vs Canva Alt Text →
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
