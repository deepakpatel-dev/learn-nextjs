// Route: /dashboard/profile
// File: app/(dashboard)/dashboard/profile/page.tsx

export default function ProfilePage() {
  return (
    <div>
      <div className="mb-4">
        <span className="text-xs font-mono bg-orange-100 text-orange-800 px-2 py-1 rounded">
          Nested under Route Group
        </span>
      </div>
      <h1 className="text-3xl font-bold mb-2">Profile</h1>
      <p className="text-gray-500 mb-8">URL: /dashboard/profile</p>

      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
        <div className="flex items-center gap-5 mb-6">
          <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center text-2xl font-bold text-orange-600">
            D
          </div>
          <div>
            <h2 className="text-xl font-semibold">Deepak Patel</h2>
            <p className="text-gray-400 text-sm">Next.js Explorer</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          {[
            { label: "Posts Written", value: "4" },
            { label: "Routes Learned", value: "6" },
            { label: "Concepts Covered", value: "6" },
            { label: "Days Active", value: "21" },
          ].map(({ label, value }) => (
            <div key={label} className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-400 text-xs mb-1">{label}</p>
              <p className="text-2xl font-bold text-gray-900">{value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-orange-50 border border-orange-200 rounded-xl p-5">
        <p className="text-sm text-orange-800">
          This page shares the sidebar from <code className="font-mono bg-white px-1 rounded">(dashboard)/layout.tsx</code>.
          Navigate to <strong>Settings</strong> or <strong>Overview</strong> — notice the sidebar stays mounted (no re-render).
          That&apos;s layout persistence in action.
        </p>
      </div>
    </div>
  );
}
