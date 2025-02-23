import React from "react";

// Source
import "@assets/css/fonts.css";
import "@assets/css/icofont.css";
import "@assets/css/bootstrap.css";

import "@i18n";
import { themeDefault } from "@theme";
import { ThemeProvider } from "@emotion/react";
import { GlobalCSS } from "@theme/style";
import Header from "./header";
import Footer from "./footer";

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <ThemeProvider theme={themeDefault}>
            <div className="wrapper">
                <GlobalCSS />
                <Header />
                {children}
                <Footer />
            </div>
        </ThemeProvider>
    );
};

export default Layout;
