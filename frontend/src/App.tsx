import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Graph from "./pages/Graph";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/graph" element={<Graph />} />
    </Routes>
  );
}