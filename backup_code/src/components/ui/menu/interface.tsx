export interface MenuProps {
    menu: MenuItem[];
}

export interface MenuItem {
    node: {
        id: string;
        isSubmenu: boolean;
        link: string;
        text: string;
        submenu?: MenuItem[];
    };
}
