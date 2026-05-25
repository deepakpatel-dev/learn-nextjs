import OptimizationNav from "@/components/OptimizationNav";

export default function OptimizationLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-5xl mx-auto px-6 py-10 flex gap-10">
      <aside className="w-52 shrink-0">
        <p className="text-xs font-mono text-gray-400 uppercase tracking-wider mb-3">Module 05</p>
        {/* prefetch={false} applied inside OptimizationNav — sidebar links are low priority */}
        <OptimizationNav />
      </aside>
      <main className="flex-1 min-w-0">{children}</main>
    </div>
  );
}
