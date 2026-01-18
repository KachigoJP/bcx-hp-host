import Image from "next/image";
import Link from "next/link";
import React, { FormEvent, useEffect, useState } from "react";

import MenuItem from "@components/common/MenuItem";
import MobileMenu from "@components/layout/MobileMenu";
import { authService } from "@/lib/strapi/services";
import { HeaderButton, IMenuItem, User } from "@utils/interfaces/index";
import { useRouter } from "next/router";

export interface HeaderData {
  logo: string;
  headerMenus: IMenuItem[];
  rightButtons?: HeaderButton[];
}
interface HeaderProps {
  topbarNone?: string;
  hclass?: string;
  data: HeaderData;
}

const Header: React.FC<HeaderProps> = (props) => {
  const { data, topbarNone, hclass = "wpo-header-style-2" } = props;
  const [scroll, setScroll] = useState<number>(0);
  const [isSearchShow, setIsSearchShow] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const router = useRouter();

  const handleScroll = (): void =>
    setScroll(document.documentElement.scrollTop);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check authentication status
  useEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
      try {
        const token = authService.getToken();
        if (token) {
          // Get user from localStorage first for instant display
          const cachedUser = authService.getUser();
          if (cachedUser && isMounted) {
            setCurrentUser(cachedUser);
            setIsAuthenticated(true);
          }

          // Then verify token is valid by calling getMe
          const user = await authService.getMe();
          if (isMounted) {
            setIsAuthenticated(true);
            setCurrentUser(user);
          }
        } else {
          if (isMounted) {
            setIsAuthenticated(false);
            setCurrentUser(null);
          }
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (_) {
        // Token invalid or expired
        if (isMounted) {
          setIsAuthenticated(false);
          setCurrentUser(null);
        }
        authService.logout(); // Clear invalid token
      } finally {
      }
    };

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  const searchHandler = (): void => {
    setIsSearchShow(!isSearchShow);
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
  };

  const clickHandler = (): void => {
    window.scrollTo(10, 0);
  };

  const handleLogout = (): void => {
    authService.logout();
    setIsAuthenticated(false);
    setCurrentUser(null);
    router.push("/");
  };

  const className = scroll > 80 ? "fixed-navbar active" : "fixed-navbar";

  const loginButton: HeaderButton | undefined = data.rightButtons?.find((button) => button.buttonId === "login");
  const logoutButton: HeaderButton | undefined = data.rightButtons?.find((button) => button.buttonId === "logout");
  const searchButton: HeaderButton | undefined = data.rightButtons?.find((button) => button.buttonId === "search");

  // Filter buttons based on authentication status
  const filteredRightButtons = data.rightButtons?.filter((button) => button.buttonId !== loginButton?.buttonId && button.buttonId !== logoutButton?.buttonId && button.buttonId !== searchButton?.buttonId);

  return (
    <div className={className}>
      <header id="header" className={topbarNone}>
        <div className={hclass ? `wpo-site-header ${hclass}` : "wpo-site-header"}>
          <nav className="navigation navbar navbar-expand-lg navbar-light">
            <div className="container-fluid">
              <div className="row align-items-center">
                <div className="col-lg-3 col-md-3 col-3 d-lg-none dl-block">
                  <div className="mobile-menu">
                    <MobileMenu menus={data.headerMenus} />
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 col-6">
                  <div className="navbar-header">
                    <Link
                      onClick={clickHandler}
                      className="navbar-brand"
                      href="/"
                    >
                      {
                        data.logo && (
                          <Image src={data.logo} width={178} height={55} alt="" />
                        )
                      }
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
                      {data.headerMenus && data.headerMenus.length > 0 && data.headerMenus.map((item, index) => (
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
                  </div>
                </div>
                <div className="col-lg-3 col-md-2 col-2">
                  <div className="header-right">
                    {/* User Menu Dropdown */}
                    {isAuthenticated && currentUser && (
                      <div className="user-menu-wrapper">
                        <button
                          className="user-menu-toggle"
                          onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                          onBlur={() => setTimeout(() => setIsUserMenuOpen(false), 200)}
                        >
                          <i className="ti-user"></i>
                          <span className="user-name">{currentUser.username}</span>
                          <i className={`ti-angle-${isUserMenuOpen ? 'up' : 'down'}`}></i>
                        </button>
                        {isUserMenuOpen && (
                          <div className="user-dropdown-menu">
                            <div className="user-info">
                              <div className="user-avatar">
                                <i className="ti-user"></i>
                              </div>
                              <div className="user-details">
                                <p className="user-name-text">{currentUser.username}</p>
                                <p className="user-email">{currentUser.email}</p>
                              </div>
                            </div>
                            {
                              filteredRightButtons && filteredRightButtons.length > 0 && (
                                <>
                                  <div className="user-menu-divider"></div>
                                  <ul className="user-menu-list">
                                    {
                                      filteredRightButtons.map((button) => (
                                        <li key={button.buttonId}>
                                          <Link href={button.link || "#"} onClick={() => setIsUserMenuOpen(false)}>
                                            {button.icon ? <i className={button.icon}></i> : null}
                                            {button.label}
                                          </Link>
                                        </li>
                                      ))
                                    }
                                  </ul>
                                </>
                              )
                            }

                            <div className="user-menu-divider"></div>
                            {logoutButton && (
                              <button
                                className="logout-btn"
                                onClick={() => {
                                  setIsUserMenuOpen(false);
                                  handleLogout();
                                }}
                              >
                                {logoutButton.icon ? <i className={logoutButton.icon}></i> : null}
                                {logoutButton.label}
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                    {!isAuthenticated && filteredRightButtons && filteredRightButtons.length > 0 && filteredRightButtons.map((button) => {
                      return (
                        <div key={button.buttonId} className="close-form">
                          <Link
                            onClick={clickHandler}
                            className="theme-btn"
                            href={button.link || "#"}
                          >
                            {button.icon ? <i className={button.icon}></i> : button.label}
                          </Link>
                        </div>
                      );
                    })}
                    {/* hiển thị login button */}
                    {!isAuthenticated && loginButton && (
                      <div className="close-form">
                        <Link onClick={clickHandler} className="theme-btn" href={loginButton.link || "#"}>
                          {loginButton.icon ? <i className={loginButton.icon}></i> : null}
                          {loginButton.label}
                        </Link>
                      </div>
                    )}
                    {
                      searchButton && (
                        <div key={searchButton.buttonId} className="header-search-form-wrapper">
                          <div className="cart-search-contact">
                            <button
                              onClick={searchHandler}
                              className="search-toggle-btn"
                              aria-label="Search"
                            >
                              <i
                                className={`${isSearchShow ? "ti-close" : searchButton.icon || "ti-search"
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
                                    placeholder={searchButton.label || "Search here..."}
                                  />
                                  <button type="submit">
                                    <i className="fi flaticon-search"></i>
                                  </button>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      )
                    }
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
