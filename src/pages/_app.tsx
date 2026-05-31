// _app.tsx — Pages Router root wrapper
//
// Every page inside src/pages/ is wrapped by this component.
// It is the Pages Router equivalent of app/layout.tsx.
// We import global CSS here so Tailwind applies to all pages-router pages.

import type { AppProps } from "next/app";
import type { NextPage } from "next";
import type { ReactNode } from "react";
import "@/app/globals.css";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactNode) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page: ReactNode) => page);
  return <>{getLayout(<Component {...pageProps} />)}</>;
}
