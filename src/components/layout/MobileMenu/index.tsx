import React, { useState } from "react";
import { Collapse, CardBody, Card } from "reactstrap";
import Link from "next/link";
import { IMenuItem } from "@utils/interfaces/index";

export interface MobileMenuProps {
  menus: IMenuItem[];
}

const MobileMenu: React.FC<MobileMenuProps> = (props) => {
  const [isMenuShow, setIsMenuShow] = useState(false);
  const [isOpen, setIsOpen] = useState<string | null>(null);

  const menuHandler = () => {
    setIsMenuShow(!isMenuShow);
  };

  const handleSetIsOpen = (id: string) => () => {
    setIsOpen(isOpen === id ? null : id);
  };

  const ClickHandler = () => {
    window.scrollTo(10, 0);
  };

  return (
    <div>
      <div className={`mobileMenu ${isMenuShow ? "show" : ""}`}>
        <div className="menu-close">
          <div className="clox" onClick={menuHandler}>
            <i className="ti-close"></i>
          </div>
        </div>

        <ul className="responsivemenu">
          {props.menus.map((item) => (
            <li key={item.id}>
              {item.submenu ? (
                <p onClick={handleSetIsOpen(item.id)}>
                  {item.title}
                  {item.submenu ? (
                    <i className="fa fa-angle-right" aria-hidden="true"></i>
                  ) : (
                    ""
                  )}
                </p>
              ) : (
                <Link onClick={ClickHandler} href={item.link}>
                  {item.title}
                </Link>
              )}
              {item.submenu && (
                <Collapse isOpen={item.id === isOpen}>
                  <Card>
                    <CardBody>
                      <ul>
                        {item.submenu.map((submenu: IMenuItem) => (
                          <li key={submenu.id}>
                            <Link
                              onClick={ClickHandler}
                              className="active"
                              href={submenu.link}
                            >
                              {submenu.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </CardBody>
                  </Card>
                </Collapse>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="showmenu" onClick={menuHandler}>
        <button type="button" className="navbar-toggler open-btn">
          <span className="icon-bar first-angle"></span>
          <span className="icon-bar middle-angle"></span>
          <span className="icon-bar last-angle"></span>
        </button>
      </div>
    </div>
  );
};

export default MobileMenu;
