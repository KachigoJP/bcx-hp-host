import React from "react";
import { graphql, useStaticQuery, Link } from "gatsby";
import { useTranslation } from "react-i18next";
import { Col, Container, Row } from "react-bootstrap";
import { StaticImage, GatsbyImage, getImage } from "gatsby-plugin-image";

// Source
import HeartIcon from "@assets/images/svg/heart.svg";
import { useSettings } from "@graphql/settings";
import Logo from "@components/common/logo";
import {
    FooterWrap,
    FooterMain,
    WidgetItem,
    AboutWidget,
    AboutWidgetText,
    WidgetTotalRaised,
    RaisedTitle,
    CopyrightText,
    TaisedAmount,
    WidgetTitle,
    WidgetGallery,
    GalleryItem,
    WidgetMenuWrap,
    NavMenu,
    NavItem,
    FooterShapeLayer,
} from "./style";
import { ISetting } from "../../../interfaces/response";

const Footer: React.FC = () => {
    const { t } = useTranslation();
    const footerQuery = useStaticQuery(graphql`
        query FooterQuery {
            footerJson {
                id
                quickLink {
                    path
                    text
                }
                quickLinkTwo {
                    path
                    text
                }
                gallery {
                    galleryitem {
                        childImageSharp {
                            gatsbyImageData
                        }
                    }
                    path
                }
                footerShapeImage {
                    childImageSharp {
                        gatsbyImageData
                    }
                }
                footerAbout
                raisedAmount
                menuTitle
                galleryTitle
            }

            allSetting {
                nodes {
                    id
                    key
                    value
                    type
                    image {
                        gatsbyImage(width: 300)
                    }
                    description
                }
            }
        }
    `);

    const {
        footerAbout,
        raisedAmount,
        menuTitle,
        galleryTitle,
        gallery,
        quickLink,
        quickLinkTwo,
        footerShapeImage,
    } = footerQuery.footerJson;

    const settings = useSettings();

    const footerimage = getImage(footerShapeImage);

    return (
        <FooterWrap>
            <FooterMain>
                <Container>
                    <Row>
                        <Col sm={12} md={6} lg={4} xl={4}>
                            <WidgetItem>
                                <AboutWidget>
                                    <Logo
                                        className="footer-logo"
                                        logo={settings.logo?.image}
                                    />
                                    <AboutWidgetText>
                                        {settings.footer_slogan?.value || ""}
                                    </AboutWidgetText>
                                    {/* <WidgetTotalRaised>
                                        <RaisedTitle>
                                            {t("Total Raised")}:
                                        </RaisedTitle>
                                        <TaisedAmount>{100000}</TaisedAmount>
                                    </WidgetTotalRaised> */}
                                </AboutWidget>
                            </WidgetItem>
                        </Col>
                        <Col sm={6} md={6} lg={4} xl={4}>
                            <WidgetItem>
                                <WidgetTitle>{galleryTitle}</WidgetTitle>
                                <WidgetGallery>
                                    <Row className="row-cols-3 row-gutter-10">
                                        {gallery.map((item: any, i: number) => {
                                            const imageGallery = getImage(
                                                item.galleryitem
                                            );
                                            return imageGallery ? (
                                                <Col key={`gallery-${i}`}>
                                                    <GalleryItem>
                                                        <GatsbyImage
                                                            image={imageGallery}
                                                            alt="Givest-HasTech"
                                                        />
                                                        <a
                                                            className="icon"
                                                            href="#!"
                                                        >
                                                            <i className="icofont-instagram"></i>
                                                        </a>
                                                    </GalleryItem>
                                                </Col>
                                            ) : null;
                                        })}
                                    </Row>
                                </WidgetGallery>
                            </WidgetItem>
                        </Col>
                        <Col sm={6} md={6} lg={4} xl={4}>
                            <WidgetItem className="menu-wrap-two-column">
                                <WidgetTitle>{menuTitle}</WidgetTitle>
                                <WidgetMenuWrap>
                                    <Row>
                                        <Col
                                            xs={6}
                                            sm={6}
                                            md={6}
                                            className="pr-sm-5"
                                        >
                                            <NavMenu>
                                                {quickLink.map(
                                                    (linkItem, i) => (
                                                        <NavItem
                                                            key={`id-${i}-one`}
                                                        >
                                                            <Link
                                                                to={
                                                                    linkItem.path
                                                                }
                                                            >
                                                                {linkItem.text}
                                                            </Link>
                                                        </NavItem>
                                                    )
                                                )}
                                            </NavMenu>
                                        </Col>

                                        <Col
                                            xs={6}
                                            sm={6}
                                            md={6}
                                            className="col-6 pl-sm-5"
                                        >
                                            <NavMenu className="align-right">
                                                {quickLinkTwo.map(
                                                    (linkItem, i) => (
                                                        <NavItem
                                                            key={`id-${i}`}
                                                        >
                                                            <Link
                                                                to={
                                                                    linkItem.path
                                                                }
                                                            >
                                                                {linkItem.text}
                                                            </Link>
                                                        </NavItem>
                                                    )
                                                )}
                                            </NavMenu>
                                        </Col>
                                    </Row>
                                </WidgetMenuWrap>
                            </WidgetItem>
                        </Col>
                    </Row>
                </Container>
                <div className="scroll-to-top">
                    <StaticImage
                        className="shape-img3"
                        src="../../../assets/images/icons/arrow-up-line.png"
                        alt="Icon-Image"
                    />
                </div>
            </FooterMain>
            <Container>
                <Row>
                    <Col sx={{ textAlign: "center" }}>
                        <CopyrightText>
                            &copy; {new Date().getFullYear()} Ban Chan Xanh.
                            Made with
                            <HeartIcon /> by
                            <a
                                href=""
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {" "}
                                Chien Kieu
                            </a>
                        </CopyrightText>
                    </Col>
                </Row>
            </Container>
            {footerimage ? (
                <FooterShapeLayer>
                    <GatsbyImage image={footerimage} alt="Image-Givest" />
                </FooterShapeLayer>
            ) : null}
        </FooterWrap>
    );
};

export default Footer;
