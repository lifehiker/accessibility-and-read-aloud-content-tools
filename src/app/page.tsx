import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Image,
  Volume2,
  Download,
  Zap,
  Check,
  ArrowRight,
  Upload,
  Sparkles,
  FileText,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alt Text Generator & Read Aloud for Creators - AccessiTools",
  description:
    "Generate export-ready alt text for product images in bulk and read PDFs, screenshots, and documents aloud. Built for ecommerce teams, creators, and content marketers.",
};

const features = [
  {
    icon: <Image className="h-6 w-6 text-indigo-600" />,
    title: "Batch Alt Text Generation",
    description:
      "Upload multiple product images at once and get concise, descriptive, and ecommerce-focused alt text for each one instantly.",
  },
  {
    icon: <Volume2 className="h-6 w-6 text-purple-600" />,
    title: "Read Documents Aloud",
    description:
      "Upload PDFs or screenshots and listen to them in your browser with Web Speech API. No app install required.",
  },
  {
    icon: <Download className="h-6 w-6 text-green-600" />,
    title: "CSV Export",
    description:
      "Export all your generated alt text as a clean CSV file, ready to import into Shopify, WooCommerce, or any platform.",
  },
  {
    icon: <Sparkles className="h-6 w-6 text-yellow-600" />,
    title: "3 Alt Text Variants",
    description:
      "Get concise (under 125 chars), descriptive (2-3 sentences), and ecommerce-focused variants for every image.",
  },
  {
    icon: <FileText className="h-6 w-6 text-blue-600" />,
    title: "OCR Screenshot Reading",
    description:
      "Upload screenshots and images with text — we extract the text via OCR and let you listen to it immediately.",
  },
  {
    icon: <Zap className="h-6 w-6 text-indigo-600" />,
    title: "Inline Editing",
    description:
      "Edit generated alt text before copying or exporting. Get AI results as a starting point, then refine as needed.",
  },
];

const howItWorks = [
  {
    step: "1",
    title: "Upload Your Images",
    description: "Drag and drop one or more images into the uploader. JPG, PNG, and WebP supported.",
  },
  {
    step: "2",
    title: "AI Generates Alt Text",
    description: "Our AI analyzes each image and produces three alt text variants optimized for accessibility and SEO.",
  },
  {
    step: "3",
    title: "Edit, Copy, or Export",
    description: "Review results inline, copy individual alt texts, or export everything as a CSV for bulk import.",
  },
];

const faqs = [
  {
    q: "What is alt text and why does it matter?",
    a: "Alt text (alternative text) is a written description of an image used by screen readers for visually impaired users, and by search engines to understand image content. Missing or poor alt text is an accessibility and SEO problem.",
  },
  {
    q: "How many images can I process at once?",
    a: "Free accounts can generate alt text for up to 10 images (lifetime). Pro accounts get 500 credits/month with batch upload support. Team accounts get 2,000 credits/month.",
  },
  {
    q: "Do I need to install anything?",
    a: "No. Everything runs in your browser. The read-aloud feature uses your browser's built-in Web Speech API, and alt text generation uses our cloud API.",
  },
  {
    q: "What file types are supported for read-aloud?",
    a: "We support PDF files (text extraction), PNG/JPG/WebP screenshots (OCR), and pasted text. Maximum file size is 10MB.",
  },
  {
    q: "Can I use this for Shopify product images?",
    a: "Yes. The ecommerce alt text variant is specifically designed for product images. Export the CSV and import it directly into your Shopify product catalog.",
  },
  {
    q: "Is there a free trial?",
    a: "Yes. All new accounts get 10 free alt text generations and 3 read-aloud sessions per month, no credit card required.",
  },
];

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-indigo-100 text-indigo-700 hover:bg-indigo-100">
              Free to Start — No Credit Card Required
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Generate Alt Text &amp; Read Documents Aloud
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Built for creators, ecommerce teams, and content marketers who need fast accessibility outputs. Upload images, get export-ready alt text. Upload PDFs and screenshots, listen immediately.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg" className="text-base px-8">
                <Link href="/signup">
                  Start Free <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base">
                <Link href="/tools/image-alt-text-generator">
                  Try Free Tool
                </Link>
              </Button>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              10 free alt text generations + 3 read-aloud sessions/month
            </p>
          </div>
        </section>

        {/* Social proof */}
        <section className="bg-white py-8 border-y">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <p className="text-sm text-gray-500 mb-4">Used by creators and ecommerce teams to solve:</p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
              <span>✓ Batch product image alt text</span>
              <span>✓ ADA accessibility compliance</span>
              <span>✓ PDF and document reading</span>
              <span>✓ Screenshot OCR and playback</span>
              <span>✓ Shopify/Etsy alt text export</span>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-20 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Everything you need for accessibility workflows
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                No bloated platform. Just the tools creators and ecommerce teams actually use for accessibility.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature) => (
                <Card key={feature.title} className="bg-white">
                  <CardContent className="p-6">
                    <div className="rounded-lg bg-gray-50 p-2 w-fit mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">How it works</h2>
              <p className="text-gray-600">Generate alt text for 10 images in under 60 seconds</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {howItWorks.map((step) => (
                <div key={step.step} className="text-center">
                  <div className="w-12 h-12 rounded-full bg-indigo-600 text-white font-bold text-xl flex items-center justify-center mx-auto mb-4">
                    {step.step}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing preview */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-gray-600 mb-10">Start free. Upgrade when you need more.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  name: "Free",
                  price: "$0",
                  note: "forever",
                  features: ["10 alt text generations", "3 read-aloud/month", "All 3 alt text variants"],
                },
                {
                  name: "Pro",
                  price: "$19",
                  note: "/month",
                  features: ["500 alt text/month", "50 read-aloud/month", "Batch upload + CSV export"],
                  highlight: true,
                },
                {
                  name: "Team",
                  price: "$49",
                  note: "/month",
                  features: ["2,000 alt text/month", "250 read-aloud/month", "5 team members"],
                },
              ].map((plan) => (
                <Card key={plan.name} className={plan.highlight ? "border-indigo-300 ring-1 ring-indigo-200" : ""}>
                  <CardContent className="p-6">
                    {plan.highlight && (
                      <Badge className="mb-3 bg-indigo-600">Most Popular</Badge>
                    )}
                    <h3 className="font-bold text-xl text-gray-900">{plan.name}</h3>
                    <div className="my-2">
                      <span className="text-3xl font-bold">{plan.price}</span>
                      <span className="text-gray-500 text-sm">{plan.note}</span>
                    </div>
                    <ul className="space-y-2 mb-4">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                          <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <Button asChild className="w-full" variant={plan.highlight ? "default" : "outline"}>
                      <Link href="/signup">Get Started</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            <p className="mt-6 text-sm text-gray-500">
              <Link href="/pricing" className="text-indigo-600 hover:underline">
                See full pricing details →
              </Link>
            </p>
          </div>
        </section>

        {/* Use cases */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Built for specific workflows
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "Ecommerce & Shopify sellers",
                  description: "Upload 50 product images at once, get CSV-ready alt text, import to Shopify in minutes instead of hours.",
                  link: "/alt-text-generator-for-ecommerce",
                  linkText: "Ecommerce alt text →",
                },
                {
                  title: "Accessibility compliance",
                  description: "Got hit with an ADA complaint? Batch process your entire image library and get compliant fast.",
                  link: "/bulk-alt-text-generator-for-images",
                  linkText: "Bulk alt text generator →",
                },
                {
                  title: "ADHD & productivity users",
                  description: "Upload long articles, PDFs, or screenshots. Listen while you commute or work. No expensive subscription.",
                  link: "/text-to-speech-reader-no-subscription",
                  linkText: "Text to speech reader →",
                },
                {
                  title: "Content marketers & social media",
                  description: "Generate Instagram-ready alt text for every post. Stop getting flagged for missing descriptions.",
                  link: "/alt-text-generator-for-instagram",
                  linkText: "Instagram alt text →",
                },
              ].map((uc) => (
                <Card key={uc.title} className="bg-gray-50 border-0">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <Upload className="h-5 w-5 text-indigo-500 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">{uc.title}</h3>
                        <p className="text-sm text-gray-600 mb-3">{uc.description}</p>
                        <Link href={uc.link} className="text-sm text-indigo-600 hover:underline font-medium">
                          {uc.linkText}
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Frequently asked questions
            </h2>
            <Accordion type="single" collapsible className="bg-white rounded-lg border px-6">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger className="text-left text-gray-900 font-medium">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 bg-indigo-600">
          <div className="max-w-2xl mx-auto text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Start generating alt text today</h2>
            <p className="text-indigo-200 mb-8">
              10 free alt text generations. No credit card required. Setup takes 30 seconds.
            </p>
            <Button asChild size="lg" className="bg-white text-indigo-600 hover:bg-indigo-50">
              <Link href="/signup">Create Free Account</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
