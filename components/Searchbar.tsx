import { Search } from "lucide-react";

type SearchBarProps = {
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
  ref?: React.Ref<HTMLInputElement>;
};

export default function SearchBar({ value, onChange, ref }: SearchBarProps) {
  return (
    <div className="relative">
      <Search
        size={18}
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"
      />
      <input
        type="text"
        placeholder="Search the menu..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        ref={ref}
        className="w-full rounded-full border border-border bg-surface py-3 pl-11 pr-4 text-sm text-text-primary placeholder:text-text-muted outline-none transition focus:border-espresso"
      />
    </div>
  );
}
