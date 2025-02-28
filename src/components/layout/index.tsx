import React from "react";
import "@i18n/index";
import { themeDefault } from "@theme/index";
import { ThemeProvider } from "@emotion/react";

// Source
import { IMenuItem } from "@interfaces/index";
import defaultProps from "@default/data/layout.json";
import Header from "./Header";
import Footer from "./Footer";
import Scrollbar from "./Scrollbar";

export interface LayoutData {
  logo: string;
  slogan: string;
  footerSlogan: string;
  facebook: string;
  instagram: string;
  google: string;
  email: string;
  phone: string;
  headerHenu: IMenuItem[];
  footerQuicklinks: IMenuItem[];
  footerMenu: IMenuItem[];
}

export interface LayoutProps {
  data: LayoutData;
}

const Layout: React.FC<React.PropsWithChildren<LayoutProps>> = ({
  children,
  data,
}) => {
  const layoutData = { ...defaultProps, ...data };

  const headerData = {
    logo: layoutData.logo,
    menus: layoutData.headerHenu,
  };

  const footerData = {
    logo: layoutData.logo,
    footerSlogan: layoutData.footerSlogan,
    facebook: layoutData.facebook,
    instagram: layoutData.instagram,
    google: layoutData.google,
    email: layoutData.email,
    phone: layoutData.phone,
    quicklinks: layoutData.footerQuicklinks,
    menus: layoutData.footerMenu,
  };

  return (
    <ThemeProvider theme={themeDefault}>
      <div className="wrapper">
        <Header data={headerData} hclass="wpo-header-style-2" />
        {children}
        <Footer data={footerData} />
        <Scrollbar />
      </div>
    </ThemeProvider>
  );
};

export default Layout;
