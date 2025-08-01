// Source

export interface IMenuItem {
  id: string;
  title: string;
  link: string;
  submenu?: IMenuItem[];
}
