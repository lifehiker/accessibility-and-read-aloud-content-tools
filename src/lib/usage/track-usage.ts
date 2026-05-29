import { db } from "@/lib/db";

export async function trackAltTextUsage(userId: string, jobId: string, units = 1) {
  await db.usageLedger.create({
    data: {
      userId,
      eventType: "alt_text_generated",
      units,
      jobId,
    },
  });

  // Increment credits used
  await db.user.update({
    where: { id: userId },
    data: {
      altTextCreditsUsed: {
        increment: units,
      },
    },
  });
}

export async function trackReadAloudUsage(userId: string, jobId: string) {
  await db.usageLedger.create({
    data: {
      userId,
      eventType: "read_aloud_session",
      units: 1,
      jobId,
    },
  });

  await db.user.update({
    where: { id: userId },
    data: {
      readAloudSessionsUsed: {
        increment: 1,
      },
    },
  });
}

export async function resetMonthlyUsageIfNeeded(userId: string) {
  const user = await db.user.findUnique({ where: { id: userId } });
  if (!user) return;

  const now = new Date();
  const resetDate = new Date(user.creditsResetAt);
  const monthsElapsed =
    (now.getFullYear() - resetDate.getFullYear()) * 12 +
    (now.getMonth() - resetDate.getMonth());

  if (monthsElapsed >= 1 && user.plan !== "free") {
    await db.user.update({
      where: { id: userId },
      data: {
        altTextCreditsUsed: 0,
        readAloudSessionsUsed: 0,
        creditsResetAt: now,
      },
    });
  }
}
