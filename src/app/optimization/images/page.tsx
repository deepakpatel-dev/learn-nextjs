import Image from "next/image";
import MarkVisited from "@/components/MarkVisited";
import TechniqueNav from "@/components/TechniqueNav";

const formats = [
  {
    name: "SVG",
    bestFor: "Icons, logos, geometric shapes",
    compression: "Vector — scales losslessly",
    transparency: true,
    sizeKb: null,
    note: "No raster data — infinitely scalable",
    color: "text-blue-700",
  },
  {
    name: "WebP",
    bestFor: "Photos, complex blends",
    compression: "25–75% smaller than JPEG/PNG",
    transparency: true,
    sizeKb: 35,
    note: "Best default for photos today",
    color: "text-green-700",
  },
  {
    name: "AVIF",
    bestFor: "Photos (modern browsers)",
    compression: "Even smaller than WebP",
    transparency: true,
    sizeKb: 22,
    note: "Best compression, still rolling out",
    color: "text-teal-700",
  },
  {
    name: "JPEG",
    bestFor: "Photos (legacy fallback)",
    compression: "Lossy, no transparency",
    transparency: false,
    sizeKb: 95,
    note: "Baseline for comparison",
    color: "text-orange-600",
  },
  {
    name: "PNG",
    bestFor: "Screenshots, pixel art",
    compression: "Lossless, larger files",
    transparency: true,
    sizeKb: 130,
    note: "Large — avoid for photos",
    color: "text-purple-600",
  },
];

export default function ImageFormatsPage() {
  const maxKb = 130;

  return (
    <div className="space-y-8">
      <MarkVisited slug="images" />

      <div>
        <span className="text-xs font-mono bg-blue-100 text-blue-800 px-2 py-1 rounded">
          Technique 02 · High impact · Images
        </span>
        <h1 className="text-2xl font-bold mt-3 mb-2">Choose the Right Image Format</h1>
        <p className="text-gray-500 text-sm leading-relaxed">
          Picking the correct format is the single highest-impact image optimization. WebP
          images are typically 25–75% smaller than JPEG or PNG at equivalent quality —
          YouTube saw a 10% performance improvement after switching.
        </p>
      </div>

      {/* Format comparison table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-3 font-semibold text-gray-700">Format</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-700">Best for</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-700">Compression</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-700">Transparency</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {formats.map((f) => (
              <tr key={f.name}>
                <td className={`px-4 py-3 font-mono font-bold ${f.color}`}>{f.name}</td>
                <td className="px-4 py-3 text-gray-600">{f.bestFor}</td>
                <td className="px-4 py-3 text-gray-600">{f.compression}</td>
                <td className={`px-4 py-3 font-medium ${f.transparency ? "text-green-600" : "text-red-500"}`}>
                  {f.transparency ? "Yes" : "No"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* File size visual comparison */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-3">Typical file size — same photo at equivalent quality</h2>
        <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-3">
          {formats.filter((f) => f.sizeKb !== null).map((f) => (
            <div key={f.name}>
              <div className="flex items-center justify-between mb-1 text-xs">
                <span className={`font-mono font-bold ${f.color}`}>{f.name}</span>
                <span className="text-gray-500">{f.sizeKb} kB · {f.note}</span>
              </div>
              <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    f.name === "JPEG" || f.name === "PNG"
                      ? "bg-red-400"
                      : f.name === "WebP"
                      ? "bg-green-400"
                      : "bg-teal-400"
                  }`}
                  style={{ width: `${((f.sizeKb ?? 0) / maxKb) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* next/image demo */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-3">
          next/image — automatic format conversion
        </h2>
        <p className="text-sm text-gray-500 mb-4 leading-relaxed">
          <code className="font-mono text-blue-700">next/image</code> automatically converts
          JPEG and PNG sources to WebP (or AVIF) at serve time, sized to the device, without
          any manual conversion step.
        </p>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col items-center gap-3">
            <p className="text-xs font-mono text-gray-400">SVG icon via next/image</p>
            <Image
              src="/next.svg"
              alt="Next.js logo"
              width={120}
              height={36}
              className="dark:invert"
            />
            <span className="text-xs text-gray-400">Served as-is (already optimal)</span>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col items-center gap-3">
            <p className="text-xs font-mono text-gray-400">SVG illustration via next/image</p>
            <Image
              src="/globe.svg"
              alt="Globe illustration"
              width={80}
              height={80}
              className="dark:invert"
            />
            <span className="text-xs text-gray-400">Served as-is (already optimal)</span>
          </div>
        </div>

        <pre className="bg-gray-900 text-gray-100 rounded-xl p-5 text-xs overflow-x-auto leading-relaxed">
{`import Image from "next/image";

// SVG — vector, scales losslessly, great for logos and icons.
<Image src="/logo.svg" alt="Logo" width={120} height={36} />

// Raster photo — next/image converts to WebP automatically at serve time.
<Image
  src="/hero-photo.png"
  alt="Hero"
  width={1200}
  height={630}
  sizes="(max-width: 768px) 100vw, 1200px"
/>`}
        </pre>
      </div>

      {/* Key points */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 text-sm">
        <h3 className="font-semibold text-blue-900 mb-3">Key points</h3>
        <ul className="space-y-1.5 text-blue-800">
          <li>Use SVG for any geometric shape — icons, logos, diagrams.</li>
          <li>
            Use WebP (or AVIF) for photos. Convert with{" "}
            <code className="font-mono">cwebp</code>, Squoosh, or let{" "}
            <code className="font-mono">next/image</code> do it automatically.
          </li>
          <li>
            <code className="font-mono">next/image</code> serves the smallest supported
            format per browser — no manual conversion pipeline needed.
          </li>
          <li>
            Add the <code className="font-mono">sizes</code> prop when the image does not
            fill the full viewport width so Next.js generates appropriately sized srcsets.
          </li>
        </ul>
      </div>

      <TechniqueNav slug="images" />
    </div>
  );
}
