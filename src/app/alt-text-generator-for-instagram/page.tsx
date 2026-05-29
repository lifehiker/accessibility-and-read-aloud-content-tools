import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alt Text Generator for Instagram Posts | AccessiTools",
  description:
    "Generate accessible alt text for Instagram posts and images. Keep your social media content accessible to visually impaired followers. Free to start.",
};

export default function InstagramAltTextPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="bg-gradient-to-b from-pink-50 to-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Alt Text Generator for Instagram
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Instagram prompts you to add alt text to every post for a reason — accessibility. Generate ready-to-use Instagram alt text in seconds using AI instead of writing it yourself.
            </p>
            <Button asChild size="lg">
              <Link href="/tools/image-alt-text-generator">
                Generate Instagram Alt Text <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
              How to add alt text on Instagram
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { step: "1", text: "Upload your photo to AccessiTools" },
                { step: "2", text: "AI generates 3 alt text variants" },
                { step: "3", text: "Copy the concise version" },
                { step: "4", text: "Paste into Instagram's Advanced Settings > Alt Text" },
              ].map((item) => (
                <div key={item.step} className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-indigo-600 text-white font-bold text-lg flex items-center justify-center mx-auto mb-3">
                    {item.step}
                  </div>
                  <p className="text-sm text-gray-700">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
              Why add alt text to Instagram posts?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "Makes your content accessible to blind and visually impaired followers",
                "Instagram uses alt text in their recommendation algorithm",
                "Improves your brand's accessibility reputation",
                "Required for ADA-compliant social media presence",
                "Helps when images don't load on slow connections",
                "Shows your audience you care about inclusion",
              ].map((reason) => (
                <div key={reason} className="flex items-start gap-2 text-sm text-gray-700">
                  <Check className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                  {reason}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Start adding better alt text today</h2>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg">
                <Link href="/signup">Create Free Account</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/tools/image-alt-text-generator">Try Free Tool</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
