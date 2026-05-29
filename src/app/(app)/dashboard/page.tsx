import { auth } from "@/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UsageMeter } from "@/components/usage/usage-meter";
import { getPlanLimits } from "@/lib/billing/entitlements";
import Link from "next/link";
import { Image, Volume2, History, ArrowRight } from "lucide-react";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    include: {
      jobs: {
        orderBy: { createdAt: "desc" },
        take: 5,
      },
    },
  });

  if (!user) redirect("/login");

  const limits = getPlanLimits(user.plan);

  const totalJobs = await db.assetJob.count({ where: { userId: user.id } });
  const doneJobs = await db.assetJob.count({
    where: { userId: user.id, status: "DONE" },
  });

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {user.name ?? user.email}!
        </h1>
        <p className="text-gray-500 mt-1">
          Here&apos;s an overview of your accessibility toolkit usage.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Jobs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalJobs}</div>
            <p className="text-xs text-gray-500 mt-1">{doneJobs} completed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Alt Text Generated</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{user.altTextCreditsUsed}</div>
            <p className="text-xs text-gray-500 mt-1">
              of {limits.altTextCredits} {user.plan === "free" ? "lifetime" : "monthly"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Read Aloud Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{user.readAloudSessionsUsed}</div>
            <p className="text-xs text-gray-500 mt-1">
              of {limits.readAloudSessions} this month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick actions */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-indigo-100 p-2">
                    <Image className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">Generate Alt Text</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Upload images and get 3 alt text variants instantly.
                    </p>
                    <Button asChild size="sm" className="mt-3">
                      <Link href="/dashboard/alt-text">
                        Start <ArrowRight className="h-3 w-3 ml-1" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-purple-100 p-2">
                    <Volume2 className="h-5 w-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">Read Aloud</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Upload PDFs, screenshots, or paste text to listen.
                    </p>
                    <Button asChild size="sm" variant="secondary" className="mt-3">
                      <Link href="/dashboard/read-aloud">
                        Start <ArrowRight className="h-3 w-3 ml-1" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent activity */}
          <h2 className="text-lg font-semibold text-gray-900 mt-6">Recent Activity</h2>
          {user.jobs.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center text-gray-500">
                <History className="h-8 w-8 mx-auto mb-2 opacity-30" />
                <p>No jobs yet. Start by generating alt text or reading a document aloud.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-2">
              {user.jobs.map((job) => (
                <div
                  key={job.id}
                  className="flex items-center justify-between p-4 bg-white rounded-lg border"
                >
                  <div className="flex items-center gap-3">
                    {job.type === "ALT_TEXT" ? (
                      <Image className="h-4 w-4 text-indigo-500" />
                    ) : (
                      <Volume2 className="h-4 w-4 text-purple-500" />
                    )}
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {job.inputText?.slice(0, 50) ?? job.type}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(job.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant={
                      job.status === "DONE"
                        ? "success"
                        : job.status === "FAILED"
                        ? "destructive"
                        : "secondary"
                    }
                  >
                    {job.status}
                  </Badge>
                </div>
              ))}
              <Button asChild variant="outline" size="sm" className="w-full">
                <Link href="/dashboard/history">View All History</Link>
              </Button>
            </div>
          )}
        </div>

        {/* Usage sidebar */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Your Plan</CardTitle>
            </CardHeader>
            <CardContent>
              <UsageMeter
                plan={user.plan}
                altTextUsed={user.altTextCreditsUsed}
                altTextLimit={limits.altTextCredits}
                readAloudUsed={user.readAloudSessionsUsed}
                readAloudLimit={limits.readAloudSessions}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
