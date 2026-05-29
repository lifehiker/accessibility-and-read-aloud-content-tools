import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, ArrowRight, X } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Text to Speech Reader — No Subscription Required | AccessiTools",
  description:
    "Read PDFs, screenshots, and text aloud without a monthly subscription. Free plan includes 3 sessions/month. Upgrade when you need more — no subscription lock-in.",
};

export default function TtsNoSubscriptionPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="bg-gradient-to-b from-green-50 to-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Text to Speech Reader — No Subscription Needed
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Read PDFs, screenshots, and any text aloud without paying $139/year for Speechify or NaturalReader. Free plan included. Pay only if you need more than 3 sessions/month.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg">
                <Link href="/signup">
                  Start Free <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/tools/pdf-to-speech">Try Without Account</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
              vs Speechify &amp; NaturalReader
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="text-left p-4 font-semibold text-gray-700">Feature</th>
                    <th className="p-4 text-center font-semibold text-indigo-700">AccessiTools</th>
                    <th className="p-4 text-center font-semibold text-gray-500">Speechify</th>
                    <th className="p-4 text-center font-semibold text-gray-500">NaturalReader</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: "Free tier", ours: true, speechify: "Limited", naturalreader: "Limited" },
                    { feature: "No subscription required", ours: true, speechify: false, naturalreader: false },
                    { feature: "PDF reading", ours: true, speechify: true, naturalreader: true },
                    { feature: "Screenshot OCR", ours: true, speechify: false, naturalreader: false },
                    { feature: "Alt text generation", ours: true, speechify: false, naturalreader: false },
                    { feature: "CSV export", ours: true, speechify: false, naturalreader: false },
                    { feature: "Price", ours: "Free / $19 / $49", speechify: "$139+/year", naturalreader: "$9.99+/month" },
                  ].map((row) => (
                    <tr key={row.feature} className="border-b">
                      <td className="p-4 text-gray-700">{row.feature}</td>
                      <td className="p-4 text-center text-indigo-700">
                        {typeof row.ours === "boolean" ? (
                          row.ours ? <Check className="h-4 w-4 text-green-500 mx-auto" /> : <X className="h-4 w-4 text-gray-300 mx-auto" />
                        ) : row.ours}
                      </td>
                      <td className="p-4 text-center text-gray-500">
                        {typeof row.speechify === "boolean" ? (
                          row.speechify ? <Check className="h-4 w-4 text-green-500 mx-auto" /> : <X className="h-4 w-4 text-gray-300 mx-auto" />
                        ) : row.speechify}
                      </td>
                      <td className="p-4 text-center text-gray-500">
                        {typeof row.naturalreader === "boolean" ? (
                          row.naturalreader ? <Check className="h-4 w-4 text-green-500 mx-auto" /> : <X className="h-4 w-4 text-gray-300 mx-auto" />
                        ) : row.naturalreader}
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
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">What you get free</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "3 read-aloud sessions per month",
                "PDF text extraction",
                "Screenshot OCR (requires API key)",
                "Paste text and listen",
                "Speed control: 0.5x–2x",
                "Voice selection from device voices",
                "Play, pause, stop controls",
                "No credit card required",
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
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Simple upgrade, not a trap</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: "Free", price: "$0", sessions: "3 sessions/month", desc: "For occasional use" },
                { name: "Pro", price: "$19/mo", sessions: "50 sessions/month", desc: "For regular readers and commuters" },
                { name: "Team", price: "$49/mo", sessions: "250 sessions/month", desc: "For teams sharing access" },
              ].map((plan) => (
                <Card key={plan.name}>
                  <CardContent className="p-6 text-center">
                    <h3 className="font-bold text-lg text-gray-900">{plan.name}</h3>
                    <p className="text-2xl font-bold text-indigo-600 my-2">{plan.price}</p>
                    <p className="text-sm font-medium text-gray-700 mb-1">{plan.sessions}</p>
                    <p className="text-xs text-gray-500">{plan.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center mt-8">
              <Button asChild size="lg">
                <Link href="/signup">Start Free — No Card Required</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-8 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap gap-3">
              <Link href="/read-pdf-aloud" className="text-indigo-600 hover:underline text-sm">Read PDF Aloud →</Link>
              <Link href="/read-screenshots-aloud" className="text-indigo-600 hover:underline text-sm">Read Screenshots →</Link>
              <Link href="/compare/speechify-alternative" className="text-indigo-600 hover:underline text-sm">vs Speechify →</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
