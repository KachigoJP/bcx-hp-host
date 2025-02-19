import React from "react";
import { useTranslation } from "react-i18next";
import { Col, Container, Row } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";

// Source
import HeartIcon from "@assets/images/svg/heart.svg";
import Logo from "@components/shared/logo";
import { FooterProps } from "./interface";
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

// sampleData
import * as SampleData from "@data/footer/footer.json";

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const config = {
    logo: "",
    footer_slogan: "ds",
    footerimage: undefined,
  };

  const {
    footerAbout,
    raisedAmount,
    menuTitle,
    galleryTitle,
    gallery,
    quickLink,
    quickLinkTwo,
    footerShapeImage,
  }: any = SampleData;

  return (
    <FooterWrap>
      <FooterMain>
        <Container>
          <Row>
            <Col sm={12} md={6} lg={4} xl={4}>
              <WidgetItem>
                <AboutWidget>
                  <Logo className="footer-logo" logo={config.logo} />
                  <AboutWidgetText>
                    {config.footer_slogan || ""}
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
                      return item.galleryitem ? (
                        <Col key={`gallery-${i}`}>
                          <GalleryItem>
                            <Image
                              src={item.galleryitem}
                              alt="Givest-HasTech"
                            />
                            <a className="icon" href="#!">
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
                    <Col xs={6} sm={6} md={6} className="pr-sm-5">
                      <NavMenu>
                        {quickLink.map((linkItem: any, i: number) => (
                          <NavItem key={`id-${i}-one`}>
                            <Link href={linkItem.path}>{linkItem.text}</Link>
                          </NavItem>
                        ))}
                      </NavMenu>
                    </Col>

                    <Col xs={6} sm={6} md={6} className="col-6 pl-sm-5">
                      <NavMenu className="align-right">
                        {quickLinkTwo.map((linkItem: any, i: number) => (
                          <NavItem key={`id-${i}`}>
                            <Link href={linkItem.path}>{linkItem.text}</Link>
                          </NavItem>
                        ))}
                      </NavMenu>
                    </Col>
                  </Row>
                </WidgetMenuWrap>
              </WidgetItem>
            </Col>
          </Row>
        </Container>
        <div className="scroll-to-top">
          <Image
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
              &copy; {new Date().getFullYear()} Ban Chan Xanh. Made with
              <HeartIcon /> by
              <a href="" target="_blank" rel="noopener noreferrer">
                {" "}
                Chien Kieu
              </a>
            </CopyrightText>
          </Col>
        </Row>
      </Container>
      {config.footerimage ? (
        <FooterShapeLayer>
          <Image
            src="/images/my-image.jpg"
            alt="My Image"
            width={500}
            height={300}
          />

          <Image src={config.footerimage} alt="Image-Givest" />
        </FooterShapeLayer>
      ) : null}
    </FooterWrap>
  );
};

export default Footer;
