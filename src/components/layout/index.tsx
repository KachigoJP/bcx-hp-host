import React from "react";

import "@i18n/index";
import { themeDefault } from "@theme/index";
import { ThemeProvider } from "@emotion/react";
import { GlobalCSS } from "@theme/style";
import Header from "./header";
import Footer from "./footer";

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <ThemeProvider theme={themeDefault}>
      <div className="wrapper">
        <GlobalCSS />
        {/* <Header /> */}
        {children}
        {/* <Footer /> */}
      </div>
    </ThemeProvider>
  );
};

export default Layout;
