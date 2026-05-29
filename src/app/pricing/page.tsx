import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing - AccessiTools Alt Text Generator & Read Aloud",
  description:
    "Start free with 10 alt text generations. Upgrade to Pro ($19/mo) for 500 credits/month, batch upload, and CSV export. Team plan available at $49/mo.",
};

const plans = [
  {
    id: "free",
    name: "Free",
    price: 0,
    period: "forever",
    description: "Perfect for trying out the platform",
    features: [
      { text: "10 alt text generations (lifetime)", included: true },
      { text: "3 read-aloud sessions/month", included: true },
      { text: "All 3 alt text variants (concise, descriptive, ecommerce)", included: true },
      { text: "Web Speech API playback", included: true },
      { text: "Batch upload", included: false },
      { text: "CSV export", included: false },
      { text: "Job history", included: false },
      { text: "Priority support", included: false },
    ],
    cta: "Get Started Free",
    ctaHref: "/signup",
  },
  {
    id: "pro",
    name: "Pro",
    price: 19,
    period: "month",
    description: "For creators and solo ecommerce operators",
    highlight: true,
    features: [
      { text: "500 alt text credits/month", included: true },
      { text: "50 read-aloud sessions/month", included: true },
      { text: "All 3 alt text variants", included: true },
      { text: "Web Speech API playback", included: true },
      { text: "Batch upload", included: true },
      { text: "CSV export", included: true },
      { text: "Job history", included: true },
      { text: "Priority support", included: true },
    ],
    cta: "Upgrade to Pro",
    ctaHref: "/signup?plan=pro",
  },
  {
    id: "team",
    name: "Team",
    price: 49,
    period: "month",
    description: "For agencies and small ecommerce teams",
    features: [
      { text: "2,000 alt text credits/month", included: true },
      { text: "250 read-aloud sessions/month", included: true },
      { text: "All 3 alt text variants", included: true },
      { text: "Web Speech API playback", included: true },
      { text: "Batch upload", included: true },
      { text: "CSV export", included: true },
      { text: "Job history", included: true },
      { text: "Priority support", included: true },
    ],
    cta: "Upgrade to Team",
    ctaHref: "/signup?plan=team",
  },
];

const comparison = [
  {
    feature: "Alt text credits",
    free: "10 (lifetime)",
    pro: "500/month",
    team: "2,000/month",
  },
  {
    feature: "Read-aloud sessions",
    free: "3/month",
    pro: "50/month",
    team: "250/month",
  },
  {
    feature: "Batch upload",
    free: false,
    pro: true,
    team: true,
  },
  {
    feature: "CSV export",
    free: false,
    pro: true,
    team: true,
  },
  {
    feature: "Job history",
    free: false,
    pro: true,
    team: true,
  },
  {
    feature: "OCR extraction",
    free: true,
    pro: true,
    team: true,
  },
  {
    feature: "Team members",
    free: "1",
    pro: "1",
    team: "Up to 5",
  },
];

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-b from-gray-50 to-white py-16 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Simple, transparent pricing
            </h1>
            <p className="text-xl text-gray-600">
              Start free. Upgrade when you&apos;re ready. No surprise fees.
            </p>
          </div>
        </section>

        {/* Plans */}
        <section className="py-12 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <Card
                  key={plan.id}
                  className={`relative flex flex-col ${
                    plan.highlight ? "border-indigo-300 ring-2 ring-indigo-200 shadow-lg" : ""
                  }`}
                >
                  {plan.highlight && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <Badge className="bg-indigo-600 text-white px-4">Most Popular</Badge>
                    </div>
                  )}
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    <p className="text-gray-500 text-sm">{plan.description}</p>
                    <div className="mt-2">
                      {plan.price === 0 ? (
                        <span className="text-4xl font-bold text-gray-900">Free</span>
                      ) : (
                        <>
                          <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                          <span className="text-gray-500">/{plan.period}</span>
                        </>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="flex flex-col flex-1">
                    <ul className="space-y-2 mb-6 flex-1">
                      {plan.features.map((feature) => (
                        <li key={feature.text} className="flex items-start gap-2 text-sm">
                          {feature.included ? (
                            <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          ) : (
                            <X className="h-4 w-4 text-gray-300 mt-0.5 flex-shrink-0" />
                          )}
                          <span className={feature.included ? "text-gray-700" : "text-gray-400"}>
                            {feature.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      asChild
                      className="w-full"
                      variant={plan.highlight ? "default" : "outline"}
                    >
                      <Link href={plan.ctaHref}>{plan.cta}</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison table */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
              Plan comparison
            </h2>
            <div className="bg-white rounded-lg border overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 text-gray-700 font-semibold">Feature</th>
                    <th className="p-4 text-center text-gray-700 font-semibold">Free</th>
                    <th className="p-4 text-center bg-indigo-50 text-indigo-700 font-semibold">Pro</th>
                    <th className="p-4 text-center text-gray-700 font-semibold">Team</th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((row, i) => (
                    <tr key={row.feature} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="p-4 text-gray-700">{row.feature}</td>
                      <td className="p-4 text-center text-gray-600">
                        {typeof row.free === "boolean" ? (
                          row.free ? <Check className="h-4 w-4 text-green-500 mx-auto" /> : <X className="h-4 w-4 text-gray-300 mx-auto" />
                        ) : row.free}
                      </td>
                      <td className="p-4 text-center bg-indigo-50/50 text-gray-600">
                        {typeof row.pro === "boolean" ? (
                          row.pro ? <Check className="h-4 w-4 text-green-500 mx-auto" /> : <X className="h-4 w-4 text-gray-300 mx-auto" />
                        ) : row.pro}
                      </td>
                      <td className="p-4 text-center text-gray-600">
                        {typeof row.team === "boolean" ? (
                          row.team ? <Check className="h-4 w-4 text-green-500 mx-auto" /> : <X className="h-4 w-4 text-gray-300 mx-auto" />
                        ) : row.team}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Pricing FAQ</h2>
            <div className="space-y-6">
              {[
                {
                  q: "Can I cancel anytime?",
                  a: "Yes. Cancel your subscription at any time from your billing page. You'll retain access until the end of your billing period.",
                },
                {
                  q: "Do unused credits roll over?",
                  a: "No. Credits reset monthly on paid plans. The free tier has a lifetime cap of 10 alt text generations.",
                },
                {
                  q: "What happens when I hit my limit?",
                  a: "You'll see an upgrade prompt. We won't process more images or sessions until you upgrade or wait for your monthly reset.",
                },
                {
                  q: "Is there a annual discount?",
                  a: "Not currently, but we're working on annual pricing. Sign up for the newsletter to be notified.",
                },
              ].map((faq) => (
                <div key={faq.q}>
                  <h3 className="font-semibold text-gray-900 mb-1">{faq.q}</h3>
                  <p className="text-gray-600 text-sm">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
