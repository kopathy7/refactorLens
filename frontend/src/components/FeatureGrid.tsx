import {
  Bot,
  ShieldCheck,
  GitBranch,
  Zap,
} from "lucide-react";

import FeatureCard from "./FeatureCard";

export default function FeatureGrid() {
  return (
    <section className="mt-20 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      <FeatureCard
        icon={<Zap size={28} />}
        title="Fast Analysis"
        description="Clone repositories and analyze source code in seconds."
      />

      <FeatureCard
        icon={<GitBranch size={28} />}
        title="Dependency Graph"
        description="Visualize relationships between functions interactively."
      />

      <FeatureCard
        icon={<ShieldCheck size={28} />}
        title="Safe Delete"
        description="Know exactly what breaks before deleting code."
      />

      <FeatureCard
        icon={<Bot size={28} />}
        title="AI Assistant"
        description="Receive intelligent refactoring suggestions."
      />

    </section>
  );
}