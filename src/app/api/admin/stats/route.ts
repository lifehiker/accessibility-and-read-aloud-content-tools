import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  void req;
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }

  const user = await db.user.findUnique({ where: { id: session.user.id } });
  if (!user?.isAdmin) {
    return NextResponse.json({ error: "Admin access required" }, { status: 403 });
  }

  const [
    totalUsers,
    totalJobs,
    altTextJobs,
    readAloudJobs,
    failedJobs,
    recentUsers,
    recentFailedJobs,
  ] = await Promise.all([
    db.user.count(),
    db.assetJob.count(),
    db.assetJob.count({ where: { type: "ALT_TEXT" } }),
    db.assetJob.count({ where: { type: "READ_ALOUD" } }),
    db.assetJob.count({ where: { status: "FAILED" } }),
    db.user.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
      select: {
        id: true,
        email: true,
        name: true,
        plan: true,
        createdAt: true,
        altTextCreditsUsed: true,
        readAloudSessionsUsed: true,
      },
    }),
    db.assetJob.findMany({
      where: { status: "FAILED" },
      orderBy: { createdAt: "desc" },
      take: 10,
      include: {
        user: { select: { email: true } },
      },
    }),
  ]);

  return NextResponse.json({
    totalUsers,
    totalJobs,
    altTextJobs,
    readAloudJobs,
    failedJobs,
    recentUsers,
    recentFailedJobs,
  });
}
