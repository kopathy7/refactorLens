interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function FeatureCard({
  icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-indigo-500 hover:-translate-y-1">

      <div className="mb-4 text-indigo-400">
        {icon}
      </div>

      <h3 className="mb-2 text-lg font-semibold text-white">
        {title}
      </h3>

      <p className="text-sm text-slate-400">
        {description}
      </p>

    </div>
  );
}