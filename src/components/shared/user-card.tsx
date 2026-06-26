interface UserCardProps {
  firstName: string;
  lastName: string;
}

export default function UserCard({ firstName, lastName }: UserCardProps) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-zinc-800 p-4">
      <p>
        {firstName} {lastName}
      </p>

      <button className="rounded bg-white px-4 py-2 text-black">
        Send Money
      </button>
    </div>
  );
}
