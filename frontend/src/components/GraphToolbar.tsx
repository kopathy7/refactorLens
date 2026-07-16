import {
  ArrowLeft,
  Download,
  Search,
  FolderGit2,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

interface Props {
  repository: string;

  search: string;

  onSearchChange: (value: string) => void;

  onSearch: () => void;
}

export default function GraphToolbar({
  repository,
  search,
  onSearchChange,
  onSearch,
}: Props) {
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-between border-b border-slate-800 bg-slate-900 px-8 py-5">

      {/* Left */}

      <div className="flex items-center gap-5">

        <button
          onClick={() => navigate("/")}
          className="rounded-xl border border-slate-700 p-2 transition hover:bg-slate-800"
        >
          <ArrowLeft size={20} />
        </button>

        <div>

          <h1 className="text-2xl font-bold">
            RefactorLens
          </h1>

          <div className="mt-1 flex items-center gap-2 text-slate-400">

            <FolderGit2 size={16} />

            <span>{repository}</span>

          </div>

        </div>

      </div>

      {/* Center */}

      <div className="mx-10 flex max-w-xl flex-1 items-center gap-3">

        <div className="relative flex-1">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
          />

          <input
            type="text"
            value={search}
            placeholder="Search function..."
            onChange={(e) =>
              onSearchChange(e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onSearch();
              }
            }}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-11 pr-4 outline-none transition focus:border-indigo-500"
          />

        </div>

        <button
          onClick={onSearch}
          className="rounded-xl bg-indigo-600 px-6 py-3 font-medium transition hover:bg-indigo-500"
        >
          Search
        </button>

      </div>

      {/* Right */}

      <button className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 transition hover:bg-indigo-500">

        <Download size={18} />

        Export Report

      </button>

    </header>
  );
}