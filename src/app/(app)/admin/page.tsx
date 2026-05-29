import { auth } from "@/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Briefcase, AlertTriangle, TrendingUp } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default async function AdminPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const user = await db.user.findUnique({ where: { id: session.user.id } });
  if (!user?.isAdmin) redirect("/dashboard");

  const [
    totalUsers,
    totalJobs,
    altTextJobs,
    readAloudJobs,
    failedJobs,
    recentUsers,
    recentFailedJobs,
    planCounts,
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
    db.user.groupBy({
      by: ["plan"],
      _count: { plan: true },
    }),
  ]);

  const planBreakdown = Object.fromEntries(
    planCounts.map((p) => [p.plan, p._count.plan])
  );

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-500 mt-1">Platform overview and management</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-indigo-500" />
              <div>
                <p className="text-xs text-gray-500">Total Users</p>
                <p className="text-2xl font-bold">{totalUsers}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <Briefcase className="h-8 w-8 text-purple-500" />
              <div>
                <p className="text-xs text-gray-500">Total Jobs</p>
                <p className="text-2xl font-bold">{totalJobs}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-xs text-gray-500">Alt Text Jobs</p>
                <p className="text-2xl font-bold">{altTextJobs}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-8 w-8 text-red-500" />
              <div>
                <p className="text-xs text-gray-500">Failed Jobs</p>
                <p className="text-2xl font-bold text-red-600">{failedJobs}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Read Aloud Jobs</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{readAloudJobs}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Plan Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Free</span>
                <span className="font-medium">{planBreakdown.free ?? 0}</span>
              </div>
              <div className="flex justify-between">
                <span>Pro</span>
                <span className="font-medium">{planBreakdown.pro ?? 0}</span>
              </div>
              <div className="flex justify-between">
                <span>Team</span>
                <span className="font-medium">{planBreakdown.team ?? 0}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Success Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {totalJobs > 0
                ? Math.round(((totalJobs - failedJobs) / totalJobs) * 100)
                : 100}
              %
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent users */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Signups</CardTitle>
          </CardHeader>
          <CardContent>
            {recentUsers.length === 0 ? (
              <p className="text-gray-500 text-sm">No users yet</p>
            ) : (
              <div className="space-y-2">
                {recentUsers.map((u) => (
                  <div key={u.id} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{u.name ?? u.email}</p>
                      <p className="text-xs text-gray-500">{u.email}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant={u.plan !== "free" ? "default" : "outline"} className="text-xs capitalize mb-1">
                        {u.plan}
                      </Badge>
                      <p className="text-xs text-gray-400">{formatDate(u.createdAt)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Failed jobs */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Failed Jobs</CardTitle>
          </CardHeader>
          <CardContent>
            {recentFailedJobs.length === 0 ? (
              <p className="text-gray-500 text-sm">No failed jobs</p>
            ) : (
              <div className="space-y-2">
                {recentFailedJobs.map((job) => (
                  <div key={job.id} className="py-2 border-b last:border-0">
                    <div className="flex items-center justify-between mb-1">
                      <Badge variant="destructive" className="text-xs">
                        {job.type}
                      </Badge>
                      <span className="text-xs text-gray-400">{formatDate(job.createdAt)}</span>
                    </div>
                    <p className="text-xs text-gray-500">{job.user.email}</p>
                    {job.inputText && (
                      <p className="text-xs text-gray-700 truncate">{job.inputText}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
