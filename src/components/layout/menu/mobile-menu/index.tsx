import { Link } from "gatsby";
import React, { Fragment } from "react";

// Sources
import {
    getClosest,
    getSiblings,
    slideToggle,
    slideUp,
} from "@utils/mobile-nav";
import { MenuProps } from "../interface";
import { MobileMenuContent, Navbar, MobileNavitem } from "./style";

const MobileNavMenu: React.FC<MenuProps> = (props) => {
    const menuArr = props.menu;

    const onClickHandler = (e: React.MouseEvent | React.KeyboardEvent) => {
        const target = e.currentTarget;
        const parentEl = target.parentElement;
        if (
            parentEl?.classList.contains("menu-expand") ||
            target.classList.contains("menu-expand")
        ) {
            const element = target.classList.contains("icon")
                ? parentEl
                : target;

            const parent = element
                ? getClosest(element as HTMLElement, "li")
                : null;

            if (parent) {
                const childNodes = parent.childNodes;
                const parentSiblings = getSiblings(parent);
                parentSiblings.forEach((sibling) => {
                    const sibChildNodes = sibling.childNodes;
                    sibChildNodes.forEach((child) => {
                        if (child.nodeName === "UL") {
                            slideUp(child as HTMLElement, 500);
                        }
                    });
                });
                childNodes.forEach((child) => {
                    if (child.nodeName === "UL") {
                        slideToggle(child as HTMLElement, 500);
                    }
                });
            }
        }
    };

    return (
        <MobileMenuContent>
            <Navbar className="site-mobile-menu">
                <ul>
                    {menuArr.map((item) => {
                        const menu = item.node;
                        const hasSubmenu = menu.isSubmenu ? true : false;
                        const submenu = menu.submenu;
                        return (
                            <MobileNavitem
                                key={`menu-${menu.id}`}
                                className={`${
                                    hasSubmenu ? "has-submenu-dropdown" : ""
                                }`}
                            >
                                <Link activeClassName="active" to={menu.link}>
                                    {menu.text}
                                </Link>
                                {submenu && (
                                    <Fragment>
                                        <button
                                            className="menu-toggle menu-expand"
                                            onClick={onClickHandler}
                                            onKeyDown={onClickHandler}
                                        >
                                            <i className="icofont-rounded-down"></i>
                                        </button>
                                        <ul className="submenu-nav">
                                            {submenu.map((submenu, i) => {
                                                return (
                                                    <MobileNavitem
                                                        key={`submenu-${i}`}
                                                    >
                                                        <Link
                                                            to={
                                                                submenu.node
                                                                    .link
                                                            }
                                                        >
                                                            {submenu.node.text}
                                                        </Link>
                                                    </MobileNavitem>
                                                );
                                            })}
                                        </ul>
                                    </Fragment>
                                )}
                            </MobileNavitem>
                        );
                    })}
                </ul>
            </Navbar>
        </MobileMenuContent>
    );
};

export default MobileNavMenu;
