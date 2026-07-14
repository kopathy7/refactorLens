import {
  AlertTriangle,
  CheckCircle2,
  ShieldAlert,
  Target,
} from "lucide-react";

interface Analysis {
  success: boolean;
  function: string;
  safe_to_delete: boolean;
  affected_functions: string[];
  calls: string[];
  impact_score: number;
  risk: string;
}

interface Props {
  selectedFunction: string;
  analysis: Analysis | null;
}

export default function ImpactPanel({
  selectedFunction,
  analysis,
}: Props) {
  if (!analysis) {
    return (
      <aside className="w-80 border-l border-slate-800 bg-slate-900 p-6">

        <h2 className="text-xl font-bold">
          Impact Analysis
        </h2>

        <div className="mt-12 rounded-2xl border border-slate-800 bg-slate-950 p-6 text-center">

          <Target
            size={40}
            className="mx-auto text-indigo-400"
          />

          <h3 className="mt-5 text-lg font-semibold">
            No Function Selected
          </h3>

          <p className="mt-3 text-sm text-slate-400">
            Click any node in the dependency graph
            to analyze its impact.
          </p>

        </div>

      </aside>
    );
  }

  return (
    <aside className="w-80 overflow-y-auto border-l border-slate-800 bg-slate-900 p-6">

      <h2 className="text-2xl font-bold">
        Impact Analysis
      </h2>

      <div className="mt-8 space-y-6">

        <div className="rounded-xl bg-slate-950 p-5">

          <p className="text-sm text-slate-500">
            Selected Function
          </p>

          <h3 className="mt-2 text-xl font-semibold text-indigo-400">
            {selectedFunction}
          </h3>

        </div>

        <div className="rounded-xl bg-slate-950 p-5">

          <p className="text-sm text-slate-500">
            Risk Level
          </p>

          <div className="mt-3 flex items-center gap-3">

            <AlertTriangle className="text-red-400" />

            <span className="text-lg font-semibold text-red-400">
              {analysis.risk}
            </span>

          </div>

        </div>

        <div className="rounded-xl bg-slate-950 p-5">

          <p className="text-sm text-slate-500">
            Impact Score
          </p>

          <h3 className="mt-3 text-3xl font-bold">
            {analysis.impact_score}
          </h3>

        </div>

        <div className="rounded-xl bg-slate-950 p-5">

          <p className="text-sm text-slate-500">
            Safe To Delete
          </p>

          <div className="mt-3 flex items-center gap-3">

            {analysis.safe_to_delete ? (
              <>
                <CheckCircle2 className="text-green-400" />
                <span className="font-semibold text-green-400">
                  YES
                </span>
              </>
            ) : (
              <>
                <ShieldAlert className="text-red-400" />
                <span className="font-semibold text-red-400">
                  NO
                </span>
              </>
            )}

          </div>

        </div>

        <div className="rounded-xl bg-slate-950 p-5">

          <h3 className="font-semibold">
            Affected Functions
          </h3>

          <ul className="mt-4 space-y-2">

            {analysis.affected_functions.length === 0 ? (
              <li className="text-slate-500">
                None
              </li>
            ) : (
              analysis.affected_functions.map((func) => (
                <li
                  key={func}
                  className="rounded-lg bg-slate-800 px-3 py-2"
                >
                  {func}
                </li>
              ))
            )}

          </ul>

        </div>

        <div className="rounded-xl bg-slate-950 p-5">

          <h3 className="font-semibold">
            Calls
          </h3>

          <ul className="mt-4 space-y-2">

            {analysis.calls.length === 0 ? (
              <li className="text-slate-500">
                None
              </li>
            ) : (
              analysis.calls.map((func) => (
                <li
                  key={func}
                  className="rounded-lg bg-slate-800 px-3 py-2"
                >
                  {func}
                </li>
              ))
            )}

          </ul>

        </div>

      </div>

    </aside>
  );
}