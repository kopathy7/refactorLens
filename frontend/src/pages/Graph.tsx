import { useSearchParams } from "react-router-dom";

import { type NodeMouseHandler } from "@xyflow/react";

import { useGraph } from "../hooks/useGraph";
import { useGraphAnalysis } from "../hooks/useGraphAnalysis";
import { useGraphSearch } from "../hooks/useGraphSearch";

import GraphToolbar from "../components/GraphToolbar";
import RepositoryExplorer from "../components/RepositoryExplorer";
import GraphCanvas from "../components/GraphCanvas";
import ImpactPanel from "../components/ImpactPanel";
import GraphStats from "../components/GraphStats";

export default function Graph() {
  const [searchParams] = useSearchParams();

  const repository =
    searchParams.get("repository") ?? "";

  const {
    nodes,
    edges,
    setNodes,
    setEdges,
    loading,
  } = useGraph(repository);

  const {
    selectedFunction,
    analysis,
    source,
    analyzeNode,
  } = useGraphAnalysis(
    repository,
    setNodes,
    setEdges
  );

  const {
    search,
    setSearch,
    handleSearch,
  } = useGraphSearch(
    nodes,
    analyzeNode
  );

  const handleNodeClick: NodeMouseHandler = (
    _,
    node
  ) => {
    analyzeNode(node.id);
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-950 text-white">
        Loading Dependency Graph...
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col bg-slate-950 text-white">

      <GraphToolbar
        repository={repository}
        search={search}
        onSearchChange={setSearch}
        onSearch={handleSearch}
      />

      <div className="flex flex-1 overflow-hidden">

        <RepositoryExplorer
          repository={repository}
        />

        <div className="flex-1">

          <GraphCanvas
            nodes={nodes}
            edges={edges}
            onNodeClick={handleNodeClick}
            selectedNode={selectedFunction}
          />

        </div>

        <ImpactPanel
          selectedFunction={selectedFunction}
          analysis={analysis}
          source={source}
        />

      </div>

      <GraphStats
        repository={repository}
      />

    </div>
  );
}