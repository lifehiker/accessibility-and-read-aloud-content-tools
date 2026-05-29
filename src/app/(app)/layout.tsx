import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { DashboardNav } from "@/components/layout/dashboard-nav";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const isAdmin = (session.user as { isAdmin?: boolean }).isAdmin ?? false;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardNav isAdmin={isAdmin} />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
