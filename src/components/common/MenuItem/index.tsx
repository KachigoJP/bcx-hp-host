import { IMenuItem } from "@utils/interfaces/index";
import Link from "next/link";
import React, { MouseEvent } from "react";

export interface MenuItemProps {
  id: string;
  title: string;
  link: string;
  submenu?: IMenuItem[];
  clickHandler: (e: MouseEvent<HTMLAnchorElement>) => void;
}

const MenuItem: React.FC<MenuItemProps> = ({
  title,
  link,
  submenu,
  clickHandler,
}) => {
  return (
    <li className={`${submenu ? "menu-item-has-children has-submenu" : ""}`}>
      <Link onClick={clickHandler} href={link}>
        {title}
      </Link>
      {submenu && submenu.length > 0 && (
        <ul className="sub-menu">
          {submenu.map((item, index) => (
            <MenuItem
              key={index}
              id={item.menuId}
              title={item.title}
              link={item.link}
              submenu={item.subMenuItems}
              clickHandler={clickHandler}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default MenuItem;
