# Learn Next.js

A hands-on reference repository for learning Next.js App Router — built module by module, explorable in the browser.

> **Stack:** Next.js 15 · TypeScript · Tailwind CSS · App Router

---

## Learning Path

| # | Module | Status |
|---|--------|--------|
| 01 | [Routing](#01-routing) | ✅ Complete |
| 02 | [Data Fetching](#02-data-fetching) | 🔜 Coming soon |
| 03 | [Rendering](#03-rendering) | 🔜 Coming soon |
| 04 | [Styling](#04-styling) | 🔜 Coming soon |
| 05 | [Optimization](#05-optimization) | 🔜 Coming soon |
| 06 | [Configuration](#06-configuration) | 🔜 Coming soon |
| 07 | [Components & Patterns](#07-components--patterns) | 🔜 Coming soon |
| 08 | [Deploying](#08-deploying) | 🔜 Coming soon |

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to explore the learning path.

---

## 01 Routing

> File-system routing, nested layouts, dynamic segments, middleware, and i18n — all runnable in the browser.

### Concepts covered

| Concept | File | Live URL |
|---------|------|----------|
| Basic routing | `app/about/page.tsx` | `/about` |
| Nested routing | `app/blog/layout.tsx` + `app/blog/page.tsx` | `/blog` |
| Dynamic routes | `app/blog/[slug]/page.tsx` | `/blog/intro-to-nextjs` |
| Nested under dynamic | `app/blog/[slug]/comments/page.tsx` | `/blog/intro-to-nextjs/comments` |
| Route groups | `app/(dashboard)/layout.tsx` | `/dashboard` |
| Catch-all routes | `app/docs/[...slug]/page.tsx` | `/docs/routing/nested` |
| has-based redirects | `next.config.ts → redirects()` | `/blog?version=legacy` |
| Custom 404 | `app/not-found.tsx` | `/any-missing-route` |
| Middleware — auth | `src/middleware.ts` | `POST /api/auth/login` |
| Middleware — CORS | `src/middleware.ts` + `next.config.ts` | All `/api/*` routes |
| Cookies — set/clear | `app/api/auth/login/route.ts` | Login → Dashboard |
| Cookie guard | `src/middleware.ts` | `/dashboard` (redirects if no cookie) |
| i18n | `app/[lang]/` + `src/dictionaries/` | `/en`, `/de`, `/en/about` |

### Key files

```
src/
├── middleware.ts                         ← CORS + auth validation + cookie guard
├── dictionaries/
│   ├── en.json                           ← English strings
│   └── de.json                           ← German strings
├── lib/
│   └── dictionary.ts                     ← getDictionary(locale)
├── components/
│   ├── Navbar.tsx                        ← shared navigation
│   ├── Header.tsx                        ← async Server Component (i18n nav)
│   ├── LocaleSwitcher.tsx                ← "use client" locale switcher
│   └── LogoutButton.tsx                  ← "use client" logout
└── app/
    ├── layout.tsx                        ← root layout
    ├── page.tsx                          ← learning path overview
    ├── not-found.tsx                     ← global 404
    ├── about/page.tsx                    ← /about
    ├── contact/page.tsx                  ← /contact
    ├── blog/
    │   ├── layout.tsx                    ← blog nested layout
    │   ├── page.tsx                      ← /blog
    │   └── [slug]/
    │       ├── page.tsx                  ← /blog/:slug
    │       └── comments/page.tsx         ← /blog/:slug/comments
    ├── (dashboard)/
    │   ├── layout.tsx                    ← dashboard sidebar (route group)
    │   └── dashboard/
    │       ├── page.tsx                  ← /dashboard
    │       ├── settings/page.tsx         ← /dashboard/settings
    │       └── profile/page.tsx          ← /dashboard/profile
    ├── docs/[...slug]/page.tsx           ← /docs/* catch-all
    ├── redirects/page.tsx                ← redirect demos
    ├── login/page.tsx                    ← login form
    ├── [lang]/
    │   ├── layout.tsx                    ← locale layout + Header
    │   ├── page.tsx                      ← /en  /de
    │   └── about/page.tsx                ← /en/about  /de/about
    └── api/auth/
        ├── login/route.ts                ← POST — validates + sets cookie
        └── logout/route.ts               ← POST — clears cookie
```

### Quick reference

```ts
// Dynamic route — receive params
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
}

// Catch-all route — receive segment array
export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params; // ["routing", "nested"]
}

// has-based redirect in next.config.ts
{
  source: "/blog",
  has: [{ type: "query", key: "version", value: "legacy" }],
  destination: "/blog/intro-to-nextjs",
  permanent: false,
}

// Middleware — set cookie
response.cookies.set("auth_token", token, { httpOnly: true, sameSite: "lax", maxAge: 86400 });

// Middleware — read cookie to guard routes
const token = request.cookies.get("auth_token");
if (!token) return NextResponse.redirect(new URL("/login", request.url));

// i18n — async Server Component loads dictionary on server
const dict = await getDictionary(lang); // no client JS shipped
```

---

## 02 Data Fetching

> *Coming soon*

Topics planned: `fetch()` in Server Components · caching strategies · `revalidate` · Server Actions · SWR on the client.

---

## 03 Rendering

> *Coming soon*

Topics planned: Server vs Client Components · SSR / SSG / ISR · Streaming & Suspense · Partial Pre-rendering (PPR).

---

## 04 Styling

> *Coming soon*

Topics planned: Tailwind CSS · CSS Modules · `next/font` · CSS-in-JS.

---

## 05 Optimization

> *Coming soon*

Topics planned: `next/image` · Metadata API · Script optimization · Bundle analysis · Core Web Vitals.

---

## 06 Configuration

> *Coming soon*

Topics planned: `next.config.ts` deep dive · Environment variables · Custom headers & rewrites · TypeScript path aliases.

---

## 07 Components & Patterns

> *Coming soon*

Topics planned: `error.tsx` & `loading.tsx` · Parallel & intercepting routes · Server Actions in forms · Composition patterns.

---

## 08 Deploying

> *Coming soon*

Topics planned: Deploy to Vercel · Docker & self-hosting · Static export · CI/CD with GitHub Actions.
