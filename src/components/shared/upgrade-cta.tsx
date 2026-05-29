import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Zap } from "lucide-react";

interface UpgradeCtaProps {
  reason?: string;
  className?: string;
}

export function UpgradeCta({
  reason = "You've reached your plan limit.",
  className,
}: UpgradeCtaProps) {
  return (
    <Card className={`border-indigo-200 bg-indigo-50 ${className ?? ""}`}>
      <CardContent className="p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-shrink-0 rounded-full bg-indigo-100 p-2">
          <Zap className="h-5 w-5 text-indigo-600" />
        </div>
        <div className="flex-1">
          <p className="font-medium text-gray-900">{reason}</p>
          <p className="text-sm text-gray-600 mt-1">
            Upgrade to Pro for 500 alt text credits/month, batch upload, and CSV export.
          </p>
        </div>
        <Button asChild>
          <Link href="/pricing">Upgrade Now</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
