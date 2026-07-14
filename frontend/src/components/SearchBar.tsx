import { Search } from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
}

export default function SearchBar({
  value,
  onChange,
  onSearch,
}: Props) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2">

      <Search
        size={18}
        className="text-slate-400"
      />

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSearch();
          }
        }}
        placeholder="Search function..."
        className="flex-1 bg-transparent text-white outline-none placeholder:text-slate-500"
      />

    </div>
  );
}