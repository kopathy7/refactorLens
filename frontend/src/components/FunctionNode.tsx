import {
  Handle,
  Position,
  type Node,
  type NodeProps,
} from "@xyflow/react";

import { Code2 } from "lucide-react";

type FunctionNode = Node<{
  label: string;
}>;

export default function FunctionNode({
  data,
}: NodeProps<FunctionNode>) {
  return (
    <div className="min-w-[220px] rounded-xl border border-slate-700 bg-slate-900 px-5 py-4 shadow-lg transition-all hover:border-indigo-500">

      <Handle type="target" position={Position.Top} />

      <div className="flex items-center gap-3">

        <Code2
          size={18}
          className="text-indigo-400"
        />

        <div>

          <h3 className="font-semibold text-white">
            {data.label}
          </h3>

          <p className="text-xs text-slate-400">
            Python Function
          </p>

        </div>

      </div>

      <Handle type="source" position={Position.Bottom} />

    </div>
  );
}