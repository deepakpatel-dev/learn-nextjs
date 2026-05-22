// _app.tsx — Pages Router root wrapper
//
// Every page inside src/pages/ is wrapped by this component.
// It is the Pages Router equivalent of app/layout.tsx.
// We import global CSS here so Tailwind applies to all pages-router pages.

import type { AppProps } from "next/app";
import "@/app/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
