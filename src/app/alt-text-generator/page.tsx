import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Check, ArrowRight, Image, Zap, Download } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Alt Text Generator - Free Image Alt Text Tool | AccessiTools",
  description:
    "Generate SEO-optimized alt text for images instantly using AI. Get 3 variants: concise, descriptive, and ecommerce-focused. Free to start — no credit card required.",
};

export default function AltTextGeneratorPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="bg-gradient-to-b from-indigo-50 to-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              AI Alt Text Generator — Free &amp; Fast
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Upload any image and get three ready-to-use alt text variants in seconds. Concise for accessibility, descriptive for context, and ecommerce-focused for product pages.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg">
                <Link href="/tools/image-alt-text-generator">
                  Try Free Tool <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/signup">Get Full Access</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
              What is alt text and why does it matter?
            </h2>
            <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
              Alt text (alternative text) describes images for screen readers used by visually impaired users. It&apos;s also how search engines understand what your images show — making it critical for both accessibility and SEO.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: <Image className="h-6 w-6 text-indigo-600" />,
                  title: "Screen Reader Accessibility",
                  description: "Good alt text ensures blind and visually impaired users can fully understand your content.",
                },
                {
                  icon: <Zap className="h-6 w-6 text-indigo-600" />,
                  title: "SEO Image Rankings",
                  description: "Search engines read alt text to index images. Missing alt text leaves ranking signals on the table.",
                },
                {
                  icon: <Download className="h-6 w-6 text-indigo-600" />,
                  title: "ADA / WCAG Compliance",
                  description: "The ADA and WCAG 2.1 require alt text for meaningful images. Missing it creates legal exposure.",
                },
              ].map((item) => (
                <Card key={item.title}>
                  <CardContent className="p-6">
                    <div className="rounded-lg bg-indigo-50 p-2 w-fit mb-4">{item.icon}</div>
                    <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
              Three alt text variants in one click
            </h2>
            <div className="bg-white rounded-lg border p-6 space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wide text-indigo-600 block mb-1">Concise</span>
                <p className="text-gray-700 bg-indigo-50 rounded p-3 text-sm">
                  &quot;White ceramic mug with indigo &lsquo;Good Morning&rsquo; text and steam rising&quot;
                </p>
                <p className="text-xs text-gray-400 mt-1">Under 125 characters — ideal for most platforms</p>
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wide text-purple-600 block mb-1">Descriptive</span>
                <p className="text-gray-700 bg-purple-50 rounded p-3 text-sm">
                  &quot;A white ceramic coffee mug sits on a light oak wood table with morning light coming through a window. The mug has &lsquo;Good Morning&rsquo; printed in indigo blue letters with visible steam rising from the top.&quot;
                </p>
                <p className="text-xs text-gray-400 mt-1">2-3 sentences covering context, colors, and mood</p>
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wide text-green-600 block mb-1">Ecommerce</span>
                <p className="text-gray-700 bg-green-50 rounded p-3 text-sm">
                  &quot;Premium white ceramic coffee mug featuring &lsquo;Good Morning&rsquo; in indigo blue script. Dishwasher-safe glazed finish with comfortable C-handle grip. Perfect for gifting or daily use. Available in 11oz and 15oz sizes.&quot;
                </p>
                <p className="text-xs text-gray-400 mt-1">Product-focused with features and selling points</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Key Features</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "GPT-4 vision AI for accurate descriptions",
                "Three variants per image, one click",
                "Batch process up to 2,000 images/month",
                "Inline editing before copy/export",
                "CSV export for Shopify, WooCommerce, and more",
                "No installation — runs in browser",
                "Supports JPG, PNG, and WebP",
                "Under 125-character concise option built-in",
              ].map((feat) => (
                <div key={feat} className="flex items-center gap-2 text-sm text-gray-700">
                  <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                  {feat}
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Button asChild size="lg">
                <Link href="/signup">Start Generating Alt Text Free</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">FAQ</h2>
            <Accordion type="single" collapsible className="bg-white rounded-lg border px-6">
              {[
                {
                  q: "How do I write good alt text?",
                  a: "Good alt text is specific, concise, and describes what a sighted user would see. Avoid phrases like 'image of' or 'photo of'. For decorative images, use empty alt text (alt=''). For informational images, describe the content and context.",
                },
                {
                  q: "What is the maximum length for alt text?",
                  a: "There's no strict maximum, but best practice is to keep alt text under 125 characters. Screen readers may truncate longer descriptions. For complex images, use a long description in addition to short alt text.",
                },
                {
                  q: "Does alt text help with SEO?",
                  a: "Yes. Google uses alt text to understand image content and index it in Google Images. Well-written alt text with relevant keywords can improve both image and page rankings.",
                },
                {
                  q: "Is this tool free?",
                  a: "You get 10 free alt text generations with no credit card required. After that, Pro plans start at $19/month for 500 credits.",
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

        <section className="py-12 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Related tools</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/alt-text-generator-for-ecommerce" className="text-indigo-600 hover:underline text-sm">
                Alt Text for Ecommerce →
              </Link>
              <Link href="/bulk-alt-text-generator-for-images" className="text-indigo-600 hover:underline text-sm">
                Bulk Alt Text Generator →
              </Link>
              <Link href="/alt-text-generator-for-instagram" className="text-indigo-600 hover:underline text-sm">
                Instagram Alt Text →
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
