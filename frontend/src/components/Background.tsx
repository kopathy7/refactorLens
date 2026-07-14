export default function Background() {
  return (
    <>
      <div className="fixed inset-0 -z-50 bg-slate-950" />

      <div className="fixed left-[-200px] top-[-150px] -z-40 h-[450px] w-[450px] rounded-full bg-indigo-600 opacity-20 blur-[140px]" />

      <div className="fixed bottom-[-180px] right-[-180px] -z-40 h-[500px] w-[500px] rounded-full bg-cyan-500 opacity-15 blur-[160px]" />

      <div className="fixed inset-0 -z-30 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:28px_28px] opacity-30" />
    </>
  );
}