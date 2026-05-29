import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface UsageMeterProps {
  plan: string;
  altTextUsed: number;
  altTextLimit: number;
  readAloudUsed: number;
  readAloudLimit: number;
}

export function UsageMeter({
  plan,
  altTextUsed,
  altTextLimit,
  readAloudUsed,
  readAloudLimit,
}: UsageMeterProps) {
  const altTextPercent = Math.min((altTextUsed / altTextLimit) * 100, 100);
  const readAloudPercent = Math.min((readAloudUsed / readAloudLimit) * 100, 100);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-700">Usage</h3>
        <Badge variant={plan === "free" ? "outline" : "default"} className="capitalize">
          {plan} Plan
        </Badge>
      </div>

      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Alt Text</span>
            <span>{altTextUsed} / {altTextLimit}</span>
          </div>
          <Progress
            value={altTextPercent}
            className={altTextPercent >= 90 ? "h-2 [&>div]:bg-red-500" : "h-2"}
          />
        </div>

        <div>
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Read Aloud Sessions</span>
            <span>{readAloudUsed} / {readAloudLimit}</span>
          </div>
          <Progress
            value={readAloudPercent}
            className={readAloudPercent >= 90 ? "h-2 [&>div]:bg-red-500" : "h-2"}
          />
        </div>
      </div>

      {plan === "free" && (
        <Button asChild size="sm" className="w-full">
          <Link href="/pricing">Upgrade to Pro</Link>
        </Button>
      )}
    </div>
  );
}
