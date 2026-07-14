import { Loader2 } from "lucide-react";

interface LoadingOverlayProps {
  open: boolean;
}

export default function LoadingOverlay({
  open,
}: LoadingOverlayProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md">

      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-10 shadow-2xl">

        <Loader2
          size={42}
          className="mx-auto animate-spin text-indigo-400"
        />

        <h2 className="mt-6 text-xl font-bold text-white text-center">
          Analyzing Repository...
        </h2>

        <p className="mt-3 text-center text-slate-400">
          Building dependency graph...
        </p>

      </div>

    </div>
  );
}