// convert globalInfo to layoutData
import { GlobalInfo } from "@/utils/interfaces";
import { LayoutData } from "@components/layout";
import { IMenuItem } from "./interfaces";

export const getStrapiImageUrl = (url: string): string => {
  return `${process.env.NEXT_PUBLIC_STRAPI_URL}${url}`;
};

export const convertGlobalInfoToLayoutData = (globalInfo: GlobalInfo): LayoutData => {
  const logo = getStrapiImageUrl(globalInfo.logo?.url ?? "");
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

export const getYearFromDate = (date: string, split = "-"): string => {
  return date.split(split)[0];
};

export const getMonthFromDate = (date: string, split = "-"): string => {
  return date.split(split)[1];
};

export const getDayFromDate = (date: string, split = "-"): string => {
  return date.split(split)[2];
};
