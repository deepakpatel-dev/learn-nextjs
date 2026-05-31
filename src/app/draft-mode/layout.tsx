import DraftModeNav from "@/components/DraftModeNav";

export default function DraftModeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="flex gap-10">
        <DraftModeNav />
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
