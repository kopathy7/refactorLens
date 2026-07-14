import { useEffect, useState } from "react";
import { getRepositoryTree } from "../services/tree";
import TreeNode from "./TreeNode";

interface RepositoryNode {
  name: string;
  type: "file" | "directory";
  children?: RepositoryNode[];
}

interface Props {
  repository: string;
}

export default function RepositoryExplorer({
  repository,
}: Props) {
  const [tree, setTree] =
    useState<RepositoryNode | null>(null);

  useEffect(() => {
    async function loadTree() {
      try {
        const result = await getRepositoryTree(repository);

        setTree(result);
      } catch (error) {
        console.error(error);
      }
    }

    if (repository) {
      loadTree();
    }
  }, [repository]);

  return (
    <aside className="w-72 overflow-y-auto border-r border-slate-800 bg-slate-900 p-4">

      <h2 className="mb-4 text-lg font-bold">
        Repository Explorer
      </h2>

      {tree && (
        <TreeNode node={tree} />
      )}

    </aside>
  );
}