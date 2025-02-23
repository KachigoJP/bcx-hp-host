import React, { useEffect, useState, Fragment } from "react";
import { graphql, useStaticQuery } from "gatsby";
import { Col, Container, Row } from "react-bootstrap";

// Source
import "@assets/css/bootstrap.css";
import "@assets/css/flaticon.css";
import "@assets/css/elegantIcons.css";
import "@assets/css/modal-video.min.css";
import Logo from "@components/common/logo";
import Button from "@components/common/button";
import MainMenu from "@components/ui/menu/main-menu";
import MobileNavMenu from "@components/ui/menu/mobile-menu";
import * as Styled from "./style";
import { ISetting } from "@interfaces/response";
import { useSettings } from "@graphql/settings";

const Header = () => {
    const staticQuery = useStaticQuery(graphql`
        query AllmenuQuery {
            allMenuJson {
                edges {
                    node {
                        id
                        text
                        link
                        isSubmenu
                    }
                }
            }
        }
    `);

    const menuData = staticQuery.allMenuJson.edges;
    const setting = useSettings();

    // State
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scroll, setScroll] = useState(0);
    const [headerTop, setHeaderTop] = useState(0);

    useEffect(() => {
        const header = document.querySelector(".header-section");
        if (header) setHeaderTop((header as HTMLElement).offsetTop);
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleScroll = () => {
        setScroll(window.scrollY);
    };

    const onClickMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    return (
        <Fragment>
            <Styled.HeaderTop
                className={`header-section ${
                    scroll > headerTop ? "is-sticky" : ""
                }`}
            >
                <Container>
                    <Row className="align-items-center">
                        <Col lg={3} md={4} sm={5} xs={8}>
                            <Logo logo={setting?.logo?.image} />
                        </Col>
                        <Col lg={9} md={8} sm={7} xs={4}>
                            <Styled.HeaderMenuArea>
                                <MainMenu menu={menuData} />

                                <Styled.HeaderActionArea>
                                    <Styled.MobileMenuBtn onClick={onClickMenu}>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </Styled.MobileMenuBtn>
                                    <Styled.ButtonBoxArea>
                                        <Button
                                            css={{ ml: "15px" }}
                                            type="button"
                                            path="/contact-us"
                                            color="gradient"
                                        >
                                            Liên hệ
                                            <i className="flaticon-right-arrow"></i>
                                        </Button>
                                    </Styled.ButtonBoxArea>
                                </Styled.HeaderActionArea>
                            </Styled.HeaderMenuArea>
                        </Col>
                    </Row>
                </Container>
            </Styled.HeaderTop>
            <Styled.MobileMenuArea
                className={`${isMenuOpen ? "mobile-menu-open" : ""}`}
            >
                <Styled.OffCanvasInner>
                    <div
                        className="OffCanvasContent"
                        onClick={onClickMenu}
                        role="button"
                        tabIndex={0}
                    ></div>
                    <Styled.OffCanvasContent>
                        <Styled.OffCanvasHeader>
                            <Logo logo={setting?.logo?.image} />
                            <Styled.CloseAction>
                                <Styled.ButtonClose onClick={onClickMenu}>
                                    <i className="icofont-close"></i>
                                </Styled.ButtonClose>
                            </Styled.CloseAction>
                        </Styled.OffCanvasHeader>

                        <MobileNavMenu menu={menuData} />
                    </Styled.OffCanvasContent>
                </Styled.OffCanvasInner>
            </Styled.MobileMenuArea>
        </Fragment>
    );
};

export default Header;
