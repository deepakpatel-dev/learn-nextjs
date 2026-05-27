// This is the REAL loading.tsx — Next.js renders it automatically
// while demo/page.tsx is still streaming (awaiting its slow data).

export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="flex gap-10">
        {/* Sidebar placeholder — mirrors the FileConventionsNav layout */}
        <div className="w-56 shrink-0 space-y-3">
          <div className="h-3 bg-gray-200 rounded animate-pulse w-20" />
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-7 bg-gray-100 rounded-lg animate-pulse" style={{ animationDelay: `${i * 80}ms` }} />
          ))}
        </div>

        {/* Main content skeleton */}
        <div className="flex-1 space-y-6 animate-pulse">
          {/* Badge */}
          <div className="h-5 bg-purple-100 rounded w-40" />
          {/* Title */}
          <div className="space-y-2">
            <div className="h-9 bg-gray-200 rounded w-2/3" />
            <div className="h-4 bg-gray-100 rounded w-full" />
            <div className="h-4 bg-gray-100 rounded w-5/6" />
          </div>
          {/* Callout box */}
          <div className="h-20 bg-purple-50 border border-purple-100 rounded-xl" />
          {/* Section heading */}
          <div className="h-5 bg-gray-200 rounded w-40" />
          {/* Card grid */}
          <div className="grid grid-cols-3 gap-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-100 rounded-xl" style={{ animationDelay: `${i * 100}ms` }} />
            ))}
          </div>
          {/* Code block */}
          <div className="h-40 bg-gray-800 rounded-xl opacity-20" />
          {/* Info box */}
          <div className="h-32 bg-blue-50 border border-blue-100 rounded-xl" />
        </div>
      </div>

      {/* "Loading" indicator overlay */}
      <div className="fixed bottom-6 right-6 bg-gray-900 text-white text-xs px-3 py-2 rounded-full font-mono flex items-center gap-2 shadow-lg">
        <span className="w-2 h-2 bg-purple-400 rounded-full animate-ping" />
        loading.tsx — streaming from server…
      </div>
    </div>
  );
}
