import { useEffect, useState } from "react";

import { Edge, Node } from "@xyflow/react";

import { getGraph } from "../services/graph";
import { getImpactAnalysis } from "../services/analysis";
import { getLayoutedElements } from "../utils/graphLayout";

export function useGraph(repository: string){

    const [nodes,setNodes]=useState<Node[]>([]);

    const [edges,setEdges]=useState<Edge[]>([]);

    const [analysis,setAnalysis]=useState<any>(null);

    const [selectedFunction,setSelectedFunction]=useState("");

    ...
}