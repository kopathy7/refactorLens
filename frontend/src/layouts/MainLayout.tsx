interface Props {
  children: React.ReactNode;
}

export default function MainLayout({ children }: Props) {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {children}
    </main>
  );
}