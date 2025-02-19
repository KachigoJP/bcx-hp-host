import React from "react";
import { useEffect, useRef } from "react";
import { graphql, useStaticQuery } from "gatsby";
import { Col, Container, Row } from "react-bootstrap";
import Parallax from "parallax-js";
import { StaticImage, GatsbyImage, getImage } from "gatsby-plugin-image";
import { useTranslation } from "react-i18next";

// Source
import Images from "@utils/images";
import Button from "@components/common/button";
import { useSettings } from "@graphql/settings";
import { usePhotos } from "@graphql/photos";
import {
    HomeSliderItem,
    Section,
    Content,
    SubTitle,
    HeroTitleWrap,
    LayerStyle,
    SliderShape,
    DonateCircleWrap,
    DonateContent,
} from "./style";

const Hero = () => {
    const { t } = useTranslation();

    const settings = useSettings();
    const heroImage = getImage(settings.hero_image.image);

    // Parallax actives
    const sceneEl = useRef(null);

    useEffect(() => {
        if (sceneEl.current) {
            const parallaxInstance = new Parallax(sceneEl.current, {
                relativeInput: true,
            });
            parallaxInstance.enable();

            return () => parallaxInstance.disable();
        }
    }, []);

    return (
        <Section>
            <HomeSliderItem>
                <Container>
                    <Row>
                        <Col md={6} lg={6} xl={7}>
                            <Content>
                                <SubTitle>
                                    <StaticImage
                                        src="../../../../data/images/icons/logo.png"
                                        alt="BanChanXanh"
                                        className="logo"
                                    />
                                    <h6>{settings.title.value}</h6>
                                </SubTitle>
                                <HeroTitleWrap>
                                    <h1
                                        dangerouslySetInnerHTML={{
                                            __html: settings.slogan.value,
                                        }}
                                    />
                                </HeroTitleWrap>
                                <div
                                    className="btn-wrp"
                                    css={{ display: "flex" }}
                                >
                                    <Button path="/causes" color="gradient">
                                        {t("Learn More")}
                                        <i className="flaticon-right-arrow"></i>
                                    </Button>
                                    <Button
                                        path="/donate"
                                        variant="outlined"
                                        css={{ marginLeft: "10px" }}
                                    >
                                        {t("Donate Now")}
                                        <i className="flaticon-right-arrow"></i>
                                    </Button>
                                </div>
                            </Content>
                        </Col>
                        <Col
                            md={{ span: 5, offset: 1 }}
                            lg={{ span: 5, offset: 1 }}
                            xl={{ span: 5, offset: 0 }}
                        >
                            <LayerStyle>
                                <div className="thumb scene">
                                    {heroImage ? (
                                        <span
                                            className="scene-layer"
                                            data-depth="0.20"
                                        >
                                            <GatsbyImage
                                                image={heroImage}
                                                alt=""
                                                imgStyle={{
                                                    maxWidth: 600,
                                                    aspectRatio: "1",
                                                }}
                                            />
                                        </span>
                                    ) : null}
                                    <div className="shape-circle scene">
                                        <span
                                            className="scene-layer"
                                            data-depth="0.40"
                                            ref={sceneEl}
                                        >
                                            <StaticImage
                                                src="../../../../assets/images/shape/2.png"
                                                alt="Hero Shape 2"
                                            />
                                        </span>
                                        <span
                                            className="scene-layer"
                                            data-depth="0.10"
                                        >
                                            <StaticImage
                                                src="../../../../assets/images/shape/circle1.png"
                                                alt="Hero Circle Image"
                                            />
                                        </span>
                                    </div>
                                </div>
                                <div
                                    className="shape-style1 scene"
                                    ref={sceneEl}
                                >
                                    <span
                                        className="scene-layer"
                                        data-depth="0.30"
                                    >
                                        <StaticImage
                                            src="../../../../assets/images/shape/1.png"
                                            alt="Hero Shape 1"
                                        />
                                    </span>
                                </div>

                                <DonateCircleWrap>
                                    <div className="pie-chart-circle"></div>
                                    <DonateContent>
                                        <div className="raised-amount">
                                            81,7797
                                        </div>
                                        <StaticImage
                                            className="line-shape-img"
                                            src="../../../../data/images/shape/line-s2.png"
                                            alt="Image-Givest"
                                        />
                                        <h5 className="donate-title">
                                            {t("Total Raised")}
                                        </h5>
                                    </DonateContent>
                                </DonateCircleWrap>
                            </LayerStyle>
                        </Col>
                    </Row>
                </Container>
                <SliderShape>
                    <div className="slider-shape">
                        <div className="shape-style1">
                            <StaticImage
                                className="shape-img1"
                                src="../../../../assets/images/shape/map1.png"
                                alt=""
                            />
                        </div>
                        <div className="shape-style2">
                            <StaticImage
                                className="shape-img2"
                                src="../../../../assets/images/shape/map2.png"
                                alt=""
                            />
                        </div>
                        <div className="shape-style3">
                            <StaticImage
                                className="shape-img3"
                                src="../../../../assets/images/shape/banner-line1.png"
                                alt=""
                            />
                        </div>
                        <div className="shape-style4">
                            <StaticImage
                                className="shape-img3"
                                src="../../../../assets/images/shape/banner-line2.png"
                                alt=""
                            />
                        </div>
                    </div>
                </SliderShape>
            </HomeSliderItem>
        </Section>
    );
};

export default Hero;
