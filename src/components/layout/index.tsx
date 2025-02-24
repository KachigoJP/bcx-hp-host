import React from "react";

import "@i18n/index";
import { themeDefault } from "@theme/index";
import { ThemeProvider } from "@emotion/react";
import Header from "./Header";
import Footer from "./Footer";
import Scrollbar from "./Scrollbar";

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <ThemeProvider theme={themeDefault}>
      <div className="wrapper">
        <Header logo='/images/logo2.png'/>
        {children}
        <Footer />
        <Scrollbar />
      </div>
    </ThemeProvider>
  );
};

export default Layout;
