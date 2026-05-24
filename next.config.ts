import type { NextConfig } from "next";

// Origins allowed to call the API from a browser.
// In production this would be your deployed domain(s).
const ALLOWED_ORIGINS = [
  "http://localhost:3000",
  "http://localhost:3001", // example: a separate frontend on a different port
];

const CORS_HEADERS = [
  { key: "Access-Control-Allow-Methods",  value: "GET, POST, PUT, DELETE, OPTIONS" },
  { key: "Access-Control-Allow-Headers",  value: "Content-Type, Authorization, X-Requested-With" },
  { key: "Access-Control-Allow-Credentials", value: "true" },
  { key: "Access-Control-Max-Age",        value: "86400" }, // preflight cache: 24 h
];

const nextConfig: NextConfig = {
  // Inject a global Sass variable ($global-brand) into every .scss file via
  // sassOptions.additionalData — no @use import needed in individual files.
  sassOptions: {
    additionalData: `$global-brand: #f97316;`,
  },

  async headers() {
    return [
      // Apply CORS headers to every /api/* route.
      // Access-Control-Allow-Origin is handled dynamically in middleware
      // (per-request, based on the incoming Origin header).
      // These static headers cover the non-origin CORS fields.
      {
        source: "/api/:path*",
        headers: CORS_HEADERS,
      },
    ];
  },

  async redirects() {
    return [
      // ─── has: query ──────────────────────────────────────────────────────────
      // Redirect only when ?version=legacy is in the URL.
      // e.g. /blog?version=legacy → /blog/intro-to-nextjs
      {
        source: "/blog",
        has: [{ type: "query", key: "version", value: "legacy" }],
        destination: "/blog/intro-to-nextjs",
        permanent: false,
      },

      // Redirect /search?q=routing → /blog/understanding-routing
      {
        source: "/search",
        has: [{ type: "query", key: "q", value: "routing" }],
        destination: "/blog/understanding-routing",
        permanent: false,
      },

      // ─── has: cookie ─────────────────────────────────────────────────────────
      // If the user has an "auth_token" cookie they are "logged in",
      // so redirect away from /login to the dashboard.
      {
        source: "/login",
        has: [{ type: "cookie", key: "auth_token" }],
        destination: "/dashboard",
        permanent: false,
      },

      // ─── has: header ─────────────────────────────────────────────────────────
      // Redirect API-doc requests that come with x-api-version: v1
      // to the legacy docs section.
      {
        source: "/docs/api",
        has: [{ type: "header", key: "x-api-version", value: "v1" }],
        destination: "/docs/api/reference/hooks",
        permanent: false,
      },

      // ─── has: query (role-based) ─────────────────────────────────────────────
      // /admin?role=admin → /dashboard  (simulate role guard)
      {
        source: "/admin",
        has: [{ type: "query", key: "role", value: "admin" }],
        destination: "/dashboard",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
