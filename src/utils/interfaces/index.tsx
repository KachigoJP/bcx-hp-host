// Source

export interface IMenuItem {
  menuId: string;
  title: string;
  link: string;
  subMenuItems?: IMenuItem[];
}
