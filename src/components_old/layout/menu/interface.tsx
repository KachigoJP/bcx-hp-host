export interface MenuProps {
  menu: MenuItem[];
}

// export interface MenuItem {
//     node: {
//         id: string;
//         isSubmenu: boolean;
//         link: string;
//         text: string;
//         submenu?: MenuItem[];
//     };
// }

export interface MenuItem {
  id: string;
  text: string;
  link: string;
  isSubmenu: boolean;
  submenu?: MenuItem[];
}
