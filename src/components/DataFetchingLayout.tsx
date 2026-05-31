// Pages Router layout wrapper for all /data-fetching/* pages.
// Used via the getLayout pattern in each page file.

import type { ReactNode } from "react";
import DataFetchingNav from "./DataFetchingNav";
import DataFetchingSideNav from "./DataFetchingSideNav";

export default function DataFetchingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <DataFetchingNav />
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex gap-10">
          <DataFetchingSideNav />
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </div>
    </div>
  );
}
