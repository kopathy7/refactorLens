import { useState } from "react";

import { type Node } from "@xyflow/react";

import toast from "react-hot-toast";

export function useGraphSearch(
  nodes: Node[],
  analyzeNode: (id: string) => void
) {
  const [search, setSearch] = useState("");

  function handleSearch() {
    const query = search.trim().toLowerCase();

    if (!query) {
      toast.error("Enter a function name.");
      return;
    }

    const node = nodes.find((node) =>
      node.id.toLowerCase().includes(query)
    );

    if (!node) {
      toast.error("Function not found.");
      return;
    }

    analyzeNode(node.id);
  }

  return {
    search,
    setSearch,
    handleSearch,
  };
}