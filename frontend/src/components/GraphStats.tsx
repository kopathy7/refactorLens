import { useEffect, useState, type ReactNode } from "react";

import {
  Activity,
  GitBranch,
  Network,
  CircleOff,
} from "lucide-react";

import { getStats } from "../services/stats";

interface Props {
  repository: string;
}

interface Stats {
  functions: number;
  dependencies: number;
  average_calls: number;
  isolated_functions: number;
}

interface StatCardProps {
  icon: ReactNode;
  title: string;
  value: number | string;
}

export default function GraphStats({
  repository,
}: Props) {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    async function loadStats() {
      try {
        const result = await getStats(repository);
        setStats(result);
      } catch (error) {
        console.error("Failed to load graph stats:", error);
      }
    }

    if (repository) {
      loadStats();
    }
  }, [repository]);

  if (!stats) {
    return (
      <footer className="border-t border-slate-800 bg-slate-900 p-6 text-center text-slate-400">
        Loading statistics...
      </footer>
    );
  }

  return (
    <footer className="border-t border-slate-800 bg-slate-900 p-4">

      <div className="grid grid-cols-4 gap-4">

        <StatCard
          icon={<Activity size={20} />}
          title="Functions"
          value={stats.functions}
        />

        <StatCard
          icon={<GitBranch size={20} />}
          title="Dependencies"
          value={stats.dependencies}
        />

        <StatCard
          icon={<Network size={20} />}
          title="Average Calls"
          value={stats.average_calls}
        />

        <StatCard
          icon={<CircleOff size={20} />}
          title="Isolated"
          value={stats.isolated_functions}
        />

      </div>

    </footer>
  );
}

function StatCard({
  icon,
  title,
  value,
}: StatCardProps) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950 p-5 shadow-lg">

      <div className="mb-3 text-indigo-400">
        {icon}
      </div>

      <div className="text-3xl font-bold text-white">
        {value}
      </div>

      <div className="mt-2 text-sm text-slate-400">
        {title}
      </div>

    </div>
  );
}