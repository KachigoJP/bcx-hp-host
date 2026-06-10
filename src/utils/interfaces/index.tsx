// Source

export interface IMenuItem {
  menuId: string;
  title: string;
  link: string;
  subMenuItems?: IMenuItem[];
}

// Re-export all interfaces for easy importing
export * from "./about";
export * from "./achievement";
export * from "./activity";
export * from "./camping";
export * from "./common";
export * from "./contact";
export * from "./donate";
export * from "./error";
export * from "./global";
export * from "./hiking";
export * from "./join";
export * from "./login";
export * from "./news";
export * from "./policy";
export * from "./privacy";
export * from "./register";
export * from "./report";
export * from "./response";
export * from "./seo";
export * from "./strapi_types";
export * from "./team";
export * from "./term";
export * from "./workshop";
export * from "./page";

