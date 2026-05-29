export type Plan = "free" | "pro" | "team";

export interface PlanLimits {
  altTextCredits: number; // -1 = unlimited
  readAloudSessions: number;
  batchUpload: boolean;
  csvExport: boolean;
  history: boolean;
}

export const PLAN_LIMITS: Record<Plan, PlanLimits> = {
  free: {
    altTextCredits: 10,
    readAloudSessions: 3,
    batchUpload: false,
    csvExport: false,
    history: false,
  },
  pro: {
    altTextCredits: 500,
    readAloudSessions: 50,
    batchUpload: true,
    csvExport: true,
    history: true,
  },
  team: {
    altTextCredits: 2000,
    readAloudSessions: 250,
    batchUpload: true,
    csvExport: true,
    history: true,
  },
};

export function getPlanLimits(plan: string): PlanLimits {
  const validPlan = (plan as Plan) in PLAN_LIMITS ? (plan as Plan) : "free";
  return PLAN_LIMITS[validPlan];
}

export function canUseAltText(
  plan: string,
  creditsUsed: number,
  resetAt: Date
): { allowed: boolean; remaining: number; reason?: string } {
  const limits = getPlanLimits(plan);
  const now = new Date();
  const resetDate = new Date(resetAt);

  // Reset monthly usage if needed (for paid plans)
  const monthsElapsed =
    (now.getFullYear() - resetDate.getFullYear()) * 12 +
    (now.getMonth() - resetDate.getMonth());

  const effectiveUsed = plan === "free" ? creditsUsed : monthsElapsed >= 1 ? 0 : creditsUsed;

  const remaining = limits.altTextCredits - effectiveUsed;
  if (remaining <= 0) {
    return {
      allowed: false,
      remaining: 0,
      reason:
        plan === "free"
          ? "You've used all 10 free alt text generations. Upgrade to Pro for 500/month."
          : "Monthly alt text credits exhausted. Upgrade for more.",
    };
  }
  return { allowed: true, remaining };
}

export function canUseReadAloud(
  plan: string,
  sessionsUsed: number,
  resetAt: Date
): { allowed: boolean; remaining: number; reason?: string } {
  const limits = getPlanLimits(plan);
  const now = new Date();
  const resetDate = new Date(resetAt);

  const monthsElapsed =
    (now.getFullYear() - resetDate.getFullYear()) * 12 +
    (now.getMonth() - resetDate.getMonth());

  const effectiveUsed = monthsElapsed >= 1 ? 0 : sessionsUsed;
  const remaining = limits.readAloudSessions - effectiveUsed;

  if (remaining <= 0) {
    return {
      allowed: false,
      remaining: 0,
      reason:
        plan === "free"
          ? "You've used all 3 free read-aloud sessions this month. Upgrade to Pro for 50/month."
          : "Monthly read-aloud sessions exhausted. Upgrade for more.",
    };
  }
  return { allowed: true, remaining };
}

export const PLAN_PRICES = {
  pro: {
    monthly: 19,
    label: "Pro",
    priceId: process.env.STRIPE_PRO_PRICE_ID ?? "",
  },
  team: {
    monthly: 49,
    label: "Team",
    priceId: process.env.STRIPE_TEAM_PRICE_ID ?? "",
  },
};
