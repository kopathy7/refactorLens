import {
  FolderGit2,
  Download,
  Code2,
  GitBranch,
  ShieldCheck,
  Bot,
} from "lucide-react";

const steps = [
  {
    icon: <FolderGit2 size={26} />,
    title: "Connect Repository",
    description: "Provide a GitHub repository URL.",
  },
  {
    icon: <Download size={26} />,
    title: "Clone Repository",
    description: "Clone the project securely for analysis.",
  },
  {
    icon: <Code2 size={26} />,
    title: "Parse Source Code",
    description: "Extract functions and dependencies using AST.",
  },
  {
    icon: <GitBranch size={26} />,
    title: "Build Dependency Graph",
    description: "Visualize relationships between functions.",
  },
  {
    icon: <ShieldCheck size={26} />,
    title: "Impact Analysis",
    description: "Identify risky deletions before refactoring.",
  },
  {
    icon: <Bot size={26} />,
    title: "AI Suggestions",
    description: "Receive intelligent refactoring guidance.",
  },
];

export default function HowItWorks() {
  return (
    <section className="mt-28">

      <h2 className="text-center text-4xl font-bold text-white">
        How RefactorLens Works
      </h2>

      <p className="mx-auto mt-4 max-w-3xl text-center text-slate-400">
        From repository cloning to AI-powered refactoring recommendations,
        RefactorLens helps you understand code before making changes.
      </p>

      <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">

        {steps.map((step, index) => (
          <div
            key={index}
            className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 transition-all duration-300 hover:-translate-y-2 hover:border-indigo-500 hover:shadow-xl"
          >
            <div className="mb-5 inline-flex rounded-xl bg-indigo-500/10 p-3 text-indigo-400">
              {step.icon}
            </div>

            <h3 className="mb-3 text-xl font-semibold text-white">
              {step.title}
            </h3>

            <p className="text-slate-400">
              {step.description}
            </p>
          </div>
        ))}

      </div>
    </section>
  );
}