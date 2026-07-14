import { ChevronRight, Folder, FileCode2 } from "lucide-react";
import { useState } from "react";

interface RepositoryNode {
  name: string;
  type: "file" | "directory";
  children?: RepositoryNode[];
}

interface Props {
  node: RepositoryNode;
}

export default function TreeNode({ node }: Props) {
  const [open, setOpen] = useState(true);

  if (node.type === "file") {
    return (
      <div className="ml-5 flex items-center gap-2 py-1 text-sm text-slate-300">
        <FileCode2 size={15} />
        {node.name}
      </div>
    );
  }

  return (
    <div className="ml-2">

      <button
        className="flex items-center gap-2 py-1 font-medium"
        onClick={() => setOpen(!open)}
      >
        <ChevronRight
          size={15}
          className={open ? "rotate-90 transition-transform" : "transition-transform"}
        />

        <Folder
          size={16}
          className="text-indigo-400"
        />

        {node.name}
      </button>

      {open &&
        node.children?.map((child) => (
          <TreeNode
            key={child.name}
            node={child}
          />
        ))}

    </div>
  );
}