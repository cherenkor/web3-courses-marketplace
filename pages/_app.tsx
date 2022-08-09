import React, { PropsWithChildren } from "react";
import { NextComponentType, NextPageContext } from "next";
import type { AppInitialProps } from "next/app";

import "@styles/globals.css";

type Props = AppInitialProps & {
  Component: NextComponentType<NextPageContext, any> & {
    Layout: ({ children }: PropsWithChildren) => JSX.Element;
  };
};

function MyApp({ Component, pageProps }: Props) {
  const Layout = Component.Layout;
  const children = <Component {...pageProps} />;

  if (!Layout) return <>{children}</>;

  return <Layout>{children}</Layout>;
}

export default MyApp;
