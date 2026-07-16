import {
  AlertTriangle,
  CheckCircle2,
  ShieldAlert,
  Target,
  FileCode2,
  ArrowDownCircle,
  ArrowUpCircle,
} from "lucide-react";

interface Analysis {
  success: boolean;
  function: string;
  safe_to_delete: boolean;

  risk: string;

  impact_score: number;

  dependency_score: number;

  incoming_calls: number;

  outgoing_calls: number;

  affected_functions: string[];

  calls: string[];
}

interface Source {
  file: string;
  line: number;
  end_line: number;
  source: string[];
}

interface Props {
  selectedFunction: string;
  analysis: Analysis | null;
  source: Source | null;
}

export default function ImpactPanel({
  selectedFunction,
  analysis,
  source,
}: Props) {
  if (!analysis) {
    return (
      <aside className="w-96 border-l border-slate-800 bg-slate-900 p-6">

        <h2 className="text-2xl font-bold">
          Impact Analysis
        </h2>

        <div className="mt-12 rounded-2xl border border-slate-800 bg-slate-950 p-8 text-center">

          <Target
            size={46}
            className="mx-auto text-indigo-400"
          />

          <h3 className="mt-5 text-xl font-semibold">
            No Function Selected
          </h3>

          <p className="mt-3 text-sm text-slate-400">
            Click a function in the graph to inspect
            its dependencies and source code.
          </p>

        </div>

      </aside>
    );
  }

  return (
    <aside className="w-96 overflow-y-auto border-l border-slate-800 bg-slate-900 p-6">

      <h2 className="text-2xl font-bold">
        Impact Analysis
      </h2>

      <div className="mt-6 space-y-5">

        {/* Function */}

        <div className="rounded-xl bg-slate-950 p-5">

          <p className="text-sm text-slate-500">
            Function
          </p>

          <h3 className="mt-2 break-all text-xl font-bold text-indigo-400">
            {selectedFunction}
          </h3>

        </div>

        {/* Risk */}

        <div className="rounded-xl bg-slate-950 p-5">

          <p className="text-sm text-slate-500">
            Risk Level
          </p>

          <div className="mt-3 flex items-center gap-3">

            <AlertTriangle className="text-red-400" />

            <span className="text-xl font-bold text-red-400">
              {analysis.risk}
            </span>

          </div>

        </div>

        {/* Stats */}

        <div className="grid grid-cols-2 gap-4">

          <div className="rounded-xl bg-slate-950 p-4">

            <p className="text-xs text-slate-500">
              Impact
            </p>

            <p className="mt-2 text-3xl font-bold">
              {analysis.impact_score}
            </p>

          </div>

          <div className="rounded-xl bg-slate-950 p-4">

            <p className="text-xs text-slate-500">
              Dependencies
            </p>

            <p className="mt-2 text-3xl font-bold">
              {analysis.dependency_score}
            </p>

          </div>

        </div>

        {/* Incoming / Outgoing */}

        <div className="grid grid-cols-2 gap-4">

          <div className="rounded-xl bg-slate-950 p-4">

            <div className="flex items-center gap-2">

              <ArrowDownCircle
                className="text-green-400"
                size={18}
              />

              <span className="text-sm">
                Incoming
              </span>

            </div>

            <p className="mt-3 text-2xl font-bold">
              {analysis.incoming_calls}
            </p>

          </div>

          <div className="rounded-xl bg-slate-950 p-4">

            <div className="flex items-center gap-2">

              <ArrowUpCircle
                className="text-blue-400"
                size={18}
              />

              <span className="text-sm">
                Outgoing
              </span>

            </div>

            <p className="mt-3 text-2xl font-bold">
              {analysis.outgoing_calls}
            </p>

          </div>

        </div>

        {/* Safe */}

        <div className="rounded-xl bg-slate-950 p-5">

          <p className="text-sm text-slate-500">
            Safe To Delete
          </p>

          <div className="mt-3 flex items-center gap-3">

            {analysis.safe_to_delete ? (
              <>
                <CheckCircle2 className="text-green-400" />
                <span className="font-bold text-green-400">
                  YES
                </span>
              </>
            ) : (
              <>
                <ShieldAlert className="text-red-400" />
                <span className="font-bold text-red-400">
                  NO
                </span>
              </>
            )}

          </div>

        </div>

        {/* File */}

        {source && (

          <div className="rounded-xl bg-slate-950 p-5">

            <div className="flex items-center gap-2">

              <FileCode2
                className="text-indigo-400"
                size={18}
              />

              <h3 className="font-semibold">
                Source
              </h3>

            </div>

            <p className="mt-3 break-all text-sm text-slate-400">

              {source.file}

            </p>

            <p className="text-sm text-slate-500">

              Lines {source.line} - {source.end_line}

            </p>

            <pre className="mt-5 overflow-auto rounded-xl bg-slate-950 border border-slate-800 p-4 text-xs leading-6 text-slate-300">

              {source.source.join("\n")}

            </pre>

          </div>

        )}

        {/* Callers */}

        <div className="rounded-xl bg-slate-950 p-5">

          <h3 className="font-semibold">
            Affected Functions
          </h3>

          <div className="mt-4 space-y-2">

            {analysis.affected_functions.length === 0 ? (

              <p className="text-slate-500">
                None
              </p>

            ) : (

              analysis.affected_functions.map((item) => (

                <div
                  key={item}
                  className="rounded-lg bg-slate-800 px-3 py-2 text-sm"
                >
                  {item}
                </div>

              ))

            )}

          </div>

        </div>

        {/* Callees */}

        <div className="rounded-xl bg-slate-950 p-5">

          <h3 className="font-semibold">
            Calls
          </h3>

          <div className="mt-4 space-y-2">

            {analysis.calls.length === 0 ? (

              <p className="text-slate-500">
                None
              </p>

            ) : (

              analysis.calls.map((item) => (

                <div
                  key={item}
                  className="rounded-lg bg-slate-800 px-3 py-2 text-sm"
                >
                  {item}
                </div>

              ))

            )}

          </div>

        </div>

      </div>

    </aside>
  );
}