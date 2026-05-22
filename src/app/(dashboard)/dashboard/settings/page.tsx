// Route: /dashboard/settings
// File: app/(dashboard)/dashboard/settings/page.tsx

export default function SettingsPage() {
  return (
    <div>
      <div className="mb-4">
        <span className="text-xs font-mono bg-orange-100 text-orange-800 px-2 py-1 rounded">
          Nested under Route Group
        </span>
      </div>
      <h1 className="text-3xl font-bold mb-2">Settings</h1>
      <p className="text-gray-500 mb-8">URL: /dashboard/settings</p>

      <div className="space-y-4">
        {[
          { label: "Display Name", value: "Deepak Patel", type: "text" },
          { label: "Email", value: "dp10675@gmail.com", type: "email" },
          { label: "Timezone", value: "Asia/Kolkata", type: "text" },
        ].map(({ label, value, type }) => (
          <div key={label} className="bg-white border border-gray-200 rounded-xl p-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
            <input
              type={type}
              defaultValue={value}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
            />
          </div>
        ))}
        <button className="bg-orange-500 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors">
          Save Changes
        </button>
      </div>
    </div>
  );
}
