import Link from "next/link";

export default function MetadataFilesPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <span className="text-xs font-mono bg-pink-100 text-pink-800 px-2 py-1 rounded">
          File Convention
        </span>
        <h1 className="text-3xl font-bold mt-3 mb-2">Metadata Files</h1>
        <p className="text-gray-500 leading-relaxed">
          Static and dynamic files placed in the{" "}
          <code className="font-mono text-sm bg-gray-100 px-1 rounded">app/</code> directory
          that Next.js automatically serves or uses to generate metadata for SEO and social
          sharing — no manual <code className="font-mono text-sm bg-gray-100 px-1 rounded">{"<head>"}</code>{" "}
          tags needed.
        </p>
      </div>

      {/* Files table */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-3">All metadata files</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-2 font-semibold text-gray-700 border-b border-gray-200">File</th>
                <th className="text-left px-4 py-2 font-semibold text-gray-700 border-b border-gray-200">Purpose</th>
                <th className="text-left px-4 py-2 font-semibold text-gray-700 border-b border-gray-200">URL / Behavior</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white text-xs">
              {[
                {
                  file: "favicon.ico",
                  purpose: "Browser tab icon",
                  url: "Served at /favicon.ico automatically",
                },
                {
                  file: "icon.png / icon.svg",
                  purpose: "App icon (multiple sizes supported)",
                  url: "Generates <link rel='icon'> tags",
                },
                {
                  file: "apple-icon.png",
                  purpose: "iOS home screen icon",
                  url: "Generates <link rel='apple-touch-icon'>",
                },
                {
                  file: "opengraph-image.png / .jpg",
                  purpose: "OG image for social sharing cards",
                  url: "Generates <meta property='og:image'>",
                },
                {
                  file: "twitter-image.png / .jpg",
                  purpose: "Twitter card image",
                  url: "Generates <meta name='twitter:image'>",
                },
                {
                  file: "robots.txt / robots.ts",
                  purpose: "Search engine crawler instructions",
                  url: "Served at /robots.txt",
                },
                {
                  file: "sitemap.xml / sitemap.ts",
                  purpose: "XML sitemap for search engines",
                  url: "Served at /sitemap.xml",
                },
                {
                  file: "manifest.json / manifest.ts",
                  purpose: "PWA web app manifest",
                  url: "Served at /manifest.json",
                },
              ].map((row) => (
                <tr key={row.file}>
                  <td className="px-4 py-2.5 font-mono text-pink-700 font-medium">{row.file}</td>
                  <td className="px-4 py-2.5 text-gray-600">{row.purpose}</td>
                  <td className="px-4 py-2.5 text-gray-400">{row.url}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Static vs dynamic */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-3">Static files vs dynamic generators</h2>
        <p className="text-sm text-gray-500 mb-3">
          Any metadata file can be either a static asset or a{" "}
          <code className="font-mono">*.ts</code> file that exports a function — useful for
          dynamic sitemaps or programmatic OG images.
        </p>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-xs font-mono text-gray-400 mb-2">Static — app/robots.txt</p>
            <pre className="bg-gray-900 text-gray-100 rounded-xl p-4 text-xs overflow-x-auto leading-relaxed">
{`User-agent: *
Allow: /

Sitemap: https://example.com/sitemap.xml`}
            </pre>
          </div>
          <div>
            <p className="text-xs font-mono text-gray-400 mb-2">Dynamic — app/robots.ts</p>
            <pre className="bg-gray-900 text-gray-100 rounded-xl p-4 text-xs overflow-x-auto leading-relaxed">
{`import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/private/",
    },
    sitemap: "https://example.com/sitemap.xml",
  };
}`}
            </pre>
          </div>
          <div>
            <p className="text-xs font-mono text-gray-400 mb-2">Dynamic — app/sitemap.ts</p>
            <pre className="bg-gray-900 text-gray-100 rounded-xl p-4 text-xs overflow-x-auto leading-relaxed">
{`import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await fetchAllPosts();
  return posts.map((post) => ({
    url: \`https://example.com/blog/\${post.slug}\`,
    lastModified: post.updatedAt,
    changeFrequency: "weekly",
    priority: 0.8,
  }));
}`}
            </pre>
          </div>
          <div>
            <p className="text-xs font-mono text-gray-400 mb-2">Dynamic — app/opengraph-image.tsx</p>
            <pre className="bg-gray-900 text-gray-100 rounded-xl p-4 text-xs overflow-x-auto leading-relaxed">
{`import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div style={{ background: "#000", color: "#fff",
      display: "flex", width: "100%", height: "100%" }}>
      <h1>My App</h1>
    </div>
  );
}`}
            </pre>
          </div>
        </div>
      </div>

      {/* Route-level override */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 text-sm text-blue-800">
        <p className="font-semibold text-blue-900 mb-2">Route-level metadata files</p>
        <p>
          You can place metadata files in any route folder — they override the root ones for
          that segment. E.g., <code className="font-mono">app/blog/opengraph-image.tsx</code>{" "}
          generates a custom OG image only for <code className="font-mono">/blog/*</code> routes,
          while the root <code className="font-mono">app/opengraph-image.png</code> covers everything else.
        </p>
      </div>

      <Link href="/file-conventions" className="text-sm text-gray-400 hover:text-blue-600 transition-colors">
        ← All conventions
      </Link>
    </div>
  );
}
