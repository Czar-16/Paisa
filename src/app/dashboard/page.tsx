import BalanceCard from "@/components/shared/balance-card";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="mx-auto max-w-5xl space-y-8"></div>
      <h1 className="font-bold text-3xl">Welcome, {session.user.name}</h1>
      <BalanceCard balance={session.user.balance} />
    </main>
  );
}
