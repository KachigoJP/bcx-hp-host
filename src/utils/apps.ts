// convert globalInfo to layoutData
import { LayoutData } from "@components/layout";
import { GlobalInfo } from "@lib/strapi/types";
import { IMenuItem } from "./interfaces";

export const convertGlobalInfoToLayoutData = (
  globalInfo: GlobalInfo
): LayoutData => {
  const logo = `${process.env.NEXT_PUBLIC_STRAPI_URL}${globalInfo.logo?.url}`;
  return {
    logo,
    slogan: globalInfo.slogan ?? "",
    footerSlogan: globalInfo.footerSlogan ?? "",
    facebook: globalInfo.facebook ?? "",
    instagram: globalInfo.instagram ?? "",
    google: globalInfo.google ?? "",
    email: globalInfo.email ?? "",
    phone: globalInfo.phone ?? "",
    headerMenus: globalInfo.headerMenus ?? ([] as IMenuItem[]),
    footerMenusTitle: globalInfo.footerMenusTitle ?? "",
    footerMenus: globalInfo.footerMenus ?? ([] as IMenuItem[]),
    footerContactTitle: globalInfo.footerContactTitle ?? "",
    footerContactDescription: globalInfo.footerContactDescription ?? "",
    footerQuicklinksTitle: globalInfo.footerQuicklinksTitle ?? "",
    footerQuicklinks: globalInfo.footerQuicklinks ?? ([] as IMenuItem[]),
  };
};
