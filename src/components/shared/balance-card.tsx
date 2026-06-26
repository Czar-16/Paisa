interface BalanceCardProps {
  balance: number;
}

export default function BalanceCard({ balance }: BalanceCardProps) {
  return (
    <div className="rounded-lg border border-zinc-800 p-6 mt-3">
      <h2 className="text-zinc-400">Available Balance</h2>
      <p className="mt-2 text-3xl font-bold">₹{balance}</p>
    </div>
  );
}
