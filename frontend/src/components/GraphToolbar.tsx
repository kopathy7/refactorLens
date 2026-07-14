import {
  ArrowLeft,
  Download,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

interface Props {
  repository: string;
}

export default function GraphToolbar({
  repository,
}: Props) {
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-between border-b border-slate-800 bg-slate-900 px-8 py-5">

      <div className="flex items-center gap-5">

        <button
          onClick={() => navigate("/")}
          className="rounded-xl border border-slate-700 p-2 hover:bg-slate-800"
        >
          <ArrowLeft size={20} />
        </button>

        <div>

          <h1 className="text-2xl font-bold">
            RefactorLens
          </h1>

          <p className="text-slate-400">
            {repository}
          </p>

        </div>

      </div>

      <button className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 hover:bg-indigo-500">

        <Download size={18} />

        Export Report

      </button>

    </header>
  );
}