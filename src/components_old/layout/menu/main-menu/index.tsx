import React from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

// Source
import { MenuProps } from "../interface";
import { HeaderNavigationArea, Navbar, Navitem } from "./style";

const MainMenu: React.FC<MenuProps> = (props) => {
  const { t } = useTranslation();
  const menuArr = props.menu;

  return (
    <HeaderNavigationArea>
      <Navbar className="main-menu">
        {menuArr.map((menu) => {
          const hasSubmenu = menu.isSubmenu ? true : false;
          const submenu = menu.submenu;

          return (
            <Navitem
              key={`menu-${menu.id}`}
              className={`${hasSubmenu ? "has-submenu" : ""}`}
            >
              <Link className="active" href={menu.link}>
                {t(menu.text)}
              </Link>
              {submenu && (
                <ul className="submenu-nav">
                  {submenu.map((submenu, i) => {
                    return (
                      <Navitem key={`submenu-${i}`}>
                        <Link href={submenu.link}>{t(submenu.text)}</Link>
                      </Navitem>
                    );
                  })}
                </ul>
              )}
            </Navitem>
          );
        })}
      </Navbar>
    </HeaderNavigationArea>
  );
};

export default MainMenu;
