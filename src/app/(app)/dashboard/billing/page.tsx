"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Check, Loader2, CreditCard, Zap, Users } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

interface Plan {
  id: string;
  name: string;
  price: number;
  period: string;
  features: string[];
  icon: React.ReactNode;
  current?: boolean;
}

const plans: Plan[] = [
  {
    id: "free",
    name: "Free",
    price: 0,
    period: "forever",
    features: [
      "10 alt text generations (lifetime)",
      "3 read-aloud sessions/month",
      "Concise, descriptive & ecommerce variants",
      "Web Speech API playback",
    ],
    icon: null,
  },
  {
    id: "pro",
    name: "Pro",
    price: 19,
    period: "month",
    features: [
      "500 alt text credits/month",
      "50 read-aloud sessions/month",
      "Batch upload",
      "CSV export",
      "Job history",
      "Priority support",
    ],
    icon: <Zap className="h-5 w-5 text-indigo-500" />,
  },
  {
    id: "team",
    name: "Team",
    price: 49,
    period: "month",
    features: [
      "2,000 alt text credits/month",
      "250 read-aloud sessions/month",
      "Everything in Pro",
      "Up to 5 team members",
      "Shared history",
      "Priority queue",
    ],
    icon: <Users className="h-5 w-5 text-purple-500" />,
  },
];

function BillingContent() {
  const [loading, setLoading] = useState<string | null>(null);
  const [currentPlan, setCurrentPlan] = useState("free");
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("success") === "true") {
      toast.success("Subscription activated! Your plan has been upgraded.");
    }

    // Fetch current user plan
    fetch("/api/auth/session")
      .then((r) => r.json())
      .then((data) => {
        if (data?.user?.plan) {
          setCurrentPlan(data.user.plan);
        }
      })
      .catch(console.error);
  }, [searchParams]);

  const handleUpgrade = async (planId: string) => {
    if (planId === "free") return;

    setLoading(planId);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: planId }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error ?? "Failed to start checkout");
        return;
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      toast.error("Failed to start checkout");
    } finally {
      setLoading(null);
    }
  };

  const handleManageSubscription = async () => {
    setLoading("manage");
    try {
      const res = await fetch("/api/stripe/customer-portal", {
        method: "POST",
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error ?? "Failed to open billing portal");
        return;
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      toast.error("Failed to open billing portal");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Billing & Plans</h1>
        <p className="text-gray-500 mt-1">
          Manage your subscription and usage limits.
        </p>
      </div>

      <div className="flex items-center gap-3 mb-8 p-4 bg-gray-50 rounded-lg border">
        <CreditCard className="h-5 w-5 text-indigo-600" />
        <div>
          <p className="font-medium text-gray-900">
            Current Plan:{" "}
            <Badge variant={currentPlan !== "free" ? "default" : "outline"} className="ml-1 capitalize">
              {currentPlan}
            </Badge>
          </p>
        </div>
        {currentPlan !== "free" && (
          <Button
            variant="outline"
            size="sm"
            className="ml-auto"
            onClick={handleManageSubscription}
            disabled={loading === "manage"}
          >
            {loading === "manage" ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : null}
            Manage Subscription
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const isCurrent = currentPlan === plan.id;
          return (
            <Card
              key={plan.id}
              className={`relative ${plan.id === "pro" ? "border-indigo-300 ring-1 ring-indigo-200" : ""}`}
            >
              {plan.id === "pro" && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-indigo-600">Most Popular</Badge>
                </div>
              )}
              <CardHeader>
                <div className="flex items-center gap-2 mb-1">
                  {plan.icon}
                  <CardTitle>{plan.name}</CardTitle>
                </div>
                <CardDescription>
                  <span className="text-3xl font-bold text-gray-900">${plan.price}</span>
                  {plan.price > 0 && (
                    <span className="text-gray-500">/{plan.period}</span>
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full"
                  variant={isCurrent ? "outline" : plan.id === "pro" ? "default" : "outline"}
                  disabled={isCurrent || loading === plan.id}
                  onClick={() => handleUpgrade(plan.id)}
                >
                  {loading === plan.id ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : null}
                  {isCurrent ? "Current Plan" : plan.id === "free" ? "Downgrade" : `Upgrade to ${plan.name}`}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default function BillingPage() {
  return (
    <Suspense fallback={<div className="p-8">Loading...</div>}>
      <BillingContent />
    </Suspense>
  );
}
