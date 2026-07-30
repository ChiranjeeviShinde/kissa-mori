type SearchBarProps = {
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
};

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="flex justify-center">
      <input
        type="text"
        placeholder="Search..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="m-3 w-full rounded-lg border bg-[#E9F1EC] px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
