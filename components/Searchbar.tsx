import { useState } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState("");

  return (
    <div className="flex justify-center">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full m-3 bg-[#E9F1EC] rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
