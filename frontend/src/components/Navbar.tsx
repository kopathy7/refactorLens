import { FolderGit2 } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="mx-auto flex max-w-7xl items-center justify-between py-8">

      <div className="flex items-center gap-3">

        <FolderGit2 className="text-indigo-400" size={28} />

        <h1 className="text-2xl font-bold tracking-tight">
          RefactorLens
        </h1>

      </div>

      <div className="flex gap-8 text-slate-400">

        <button className="hover:text-white transition">
          Home
        </button>

        <button className="hover:text-white transition">
          Graph
        </button>

        <button className="hover:text-white transition">
          GitHub
        </button>

      </div>

    </nav>
  );
}