// Source

export interface IMenuItem {
  menuId: string;
  title: string;
  link: string;
  subMenuItems?: IMenuItem[];
}

// Re-export all interfaces for easy importing
export * from "./about";
export * from "./global";
export * from "./response";
export * from "./seo";
export * from "./strapi_types";

