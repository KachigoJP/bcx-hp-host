import { ThemeProvider } from "@emotion/react";
import "@utils/i18n/index";
import { themeDefault } from "@utils/theme/index";
import React from "react";

// Source
import { HeaderButton, IMenuItem } from "@utils/interfaces/index";
import defaultProps from "../../data/layout.json";
import Footer from "./Footer";
import Header from "./Header";
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
  headerMenus: IMenuItem[];
  rightButtons?: HeaderButton[];
  footerQuicklinksTitle: string;
  footerQuicklinks: IMenuItem[];
  footerContactTitle: string;
  footerContactDescription: string;
  footerMenusTitle: string;
  footerMenus: IMenuItem[];
}

export interface LayoutProps {
  data: LayoutData;
}

const Layout: React.FC<React.PropsWithChildren<LayoutProps>> = ({
  children,
  data,
}) => {
  const layoutData = data ?? defaultProps.data;

  const headerData = {
    logo: layoutData.logo,
    headerMenus: layoutData.headerMenus,
    rightButtons: layoutData.rightButtons,
  };

  const footerData = {
    logo: layoutData.logo,
    footerSlogan: layoutData.footerSlogan,
    facebook: layoutData.facebook,
    instagram: layoutData.instagram,
    google: layoutData.google,
    email: layoutData.email,
    phone: layoutData.phone,
    footerQuicklinks: layoutData.footerQuicklinks,
    footerContactTitle: layoutData.footerContactTitle,
    footerContactDescription: layoutData.footerContactDescription,
    footerQuicklinksTitle: layoutData.footerQuicklinksTitle,
    footerMenus: layoutData.footerMenus,
    footerMenusTitle: layoutData.footerMenusTitle,
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
