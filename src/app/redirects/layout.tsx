import RoutingNav from "@/components/RoutingNav";

export default function RedirectsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="flex gap-10">
        <RoutingNav />
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
