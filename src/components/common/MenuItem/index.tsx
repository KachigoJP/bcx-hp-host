import React, { MouseEvent } from "react";
import Link from "next/link";
import { IMenuItem } from "@utils/interfaces/index";

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
      {submenu && (
        <ul className="sub-menu">
          {submenu.map((item, index) => (
            <MenuItem
              key={index}
              id={item.id}
              title={item.title}
              link={item.link}
              submenu={item.submenu}
              clickHandler={clickHandler}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default MenuItem;
