import { Input } from "../ui/input";

interface SearchBarProps {
  value: string;
  onchange: (value: string) => void;
}

export default function SearchBar({ value, onchange }: SearchBarProps) {
  return (
    <Input
      placeholder="Search user..."
      value={value}
      onChange={(e) => onchange(e.target.value)}
    />
  );
}
