import Image from "next/image";
import Link from "next/link";
import React, { FormEvent, MouseEvent, useEffect, useState } from "react";

import MenuItem from "@components/common/MenuItem";
import MobileMenu from "@components/layout/MobileMenu";
import { IMenuItem } from "@utils/interfaces/index";

export interface HeaderData {
  logo: string;
  menus: IMenuItem[];
}
interface HeaderProps {
  topbarNone?: string;
  hclass?: string;
  data: HeaderData;
}

const Header: React.FC<HeaderProps> = (props) => {
  const { data, topbarNone, hclass } = props;
  const [scroll, setScroll] = useState<number>(0);
  const [isSearchShow, setIsSearchShow] = useState<boolean>(false);

  const handleScroll = (): void =>
    setScroll(document.documentElement.scrollTop);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const searchHandler = (): void => {
    setIsSearchShow(!isSearchShow);
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
  };

  const clickHandler = (e: MouseEvent<HTMLAnchorElement>): void => {
    window.scrollTo(10, 0);
  };

  const className = scroll > 80 ? "fixed-navbar active" : "fixed-navbar";

  return (
    <div className={className}>
      <header id="header" className={topbarNone}>
        <div className={`wpo-site-header ${hclass}`}>
          <nav className="navigation navbar navbar-expand-lg navbar-light">
            <div className="container-fluid">
              <div className="row align-items-center">
                <div className="col-lg-3 col-md-3 col-3 d-lg-none dl-block">
                  <div className="mobile-menu">
                    <MobileMenu menus={data.menus} />
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 col-6">
                  <div className="navbar-header">
                    <Link
                      onClick={clickHandler}
                      className="navbar-brand"
                      href="/"
                    >
                      <Image src={data.logo} width={178} height={55} alt="" />
                    </Link>
                  </div>
                </div>
                <div className="col-lg-6 col-md-1 col-1">
                  <div
                    id="navbar"
                    className="collapse navbar-collapse navigation-holder d-flex justify-content-center"
                  >
                    <button className="menu-close">
                      <i className="ti-close"></i>
                    </button>
                    <ul className="nav navbar-nav mb-2 mb-lg-0 d-flex justify-content-center align-items-center">
                      {data.menus && data.menus.length > 0 && data.menus.map((item, index) => (
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
                  </div>
                </div>
                <div className="col-lg-3 col-md-2 col-2">
                  <div className="header-right">
                    <div className="close-form">
                      <Link
                        onClick={clickHandler}
                        className="theme-btn"
                        href="/donate"
                      >
                        Ủng hộ
                      </Link>
                    </div>
                    <div className="header-search-form-wrapper">
                      <div className="cart-search-contact">
                        <button
                          onClick={searchHandler}
                          className="search-toggle-btn"
                        >
                          <i
                            className={`${isSearchShow ? "ti-close" : "ti-search"
                              }`}
                          ></i>
                        </button>
                        <div
                          className={`header-search-form ${isSearchShow ? "header-search-content-toggle" : ""
                            }`}
                        >
                          <form onSubmit={submitHandler}>
                            <div>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Search here..."
                              />
                              <button type="submit">
                                <i className="fi flaticon-search"></i>
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Header;
