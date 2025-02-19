import React from "react";
import { SessionProvider } from "next-auth/react";

// import "@/styles/globals.css";
import "@assets/css/bootstrap.css";
import "@assets/css/flaticon.css";
import "@assets/css/elegantIcons.css";
import "@assets/css/modal-video.min.css";

// Source
import "@assets/css/fonts.css";
import "@assets/css/icofont.css";
import "@assets/css/bootstrap.css";

import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
