import StylingNav from "@/components/StylingNav";

export default function StylingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="flex gap-10">
        <StylingNav />
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
