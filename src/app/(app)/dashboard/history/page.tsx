import { auth } from "@/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Image, Volume2, History } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default async function HistoryPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const jobs = await db.assetJob.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    take: 20,
    include: {
      files: { take: 1 },
    },
  });

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Job History</h1>
        <p className="text-gray-500 mt-1">Your last 20 jobs</p>
      </div>

      {jobs.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <History className="h-12 w-12 mx-auto mb-3 text-gray-300" />
            <p className="text-gray-500">No jobs yet. Generate some alt text or use read aloud to see history here.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {jobs.map((job) => {
            const meta = job.metaJson ? JSON.parse(job.metaJson) : null;
            return (
              <Card key={job.id}>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className={`rounded-lg p-2 mt-0.5 ${job.type === "ALT_TEXT" ? "bg-indigo-100" : "bg-purple-100"}`}>
                        {job.type === "ALT_TEXT" ? (
                          <Image className="h-4 w-4 text-indigo-600" />
                        ) : (
                          <Volume2 className="h-4 w-4 text-purple-600" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-gray-900 text-sm">
                            {job.type === "ALT_TEXT" ? "Alt Text Generation" : "Read Aloud"}
                          </span>
                          <Badge
                            variant={
                              job.status === "DONE"
                                ? "success"
                                : job.status === "FAILED"
                                ? "destructive"
                                : "secondary"
                            }
                            className="text-xs"
                          >
                            {job.status}
                          </Badge>
                        </div>
                        {job.inputText && (
                          <p className="text-sm text-gray-500 truncate">
                            {job.inputText}
                          </p>
                        )}
                        {meta?.concise && (
                          <p className="text-sm text-gray-700 mt-1 truncate">
                            &quot;{meta.concise}&quot;
                          </p>
                        )}
                        {job.outputText && job.type === "READ_ALOUD" && (
                          <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                            {job.outputText.slice(0, 150)}...
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="text-right text-xs text-gray-400 whitespace-nowrap">
                      {formatDate(job.createdAt)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-gray-500">
            Showing last 20 jobs
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}
