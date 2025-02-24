import React from "react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Parallax from "parallax-js";
import { useTranslation } from "react-i18next";
import { GetServerSideProps } from "next";

// Source
import Button from "../../../common/button";
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
import { HeroProps } from "./interface";

const Hero: React.FC<HeroProps> = ({ data }) => {
    const { t } = useTranslation();

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
                                    <Image
                                        src={data.logo}
                                        alt="BanChanXanh"
                                        className="logo"
                                        width={100}
                                        height={100}
                                    />
                                    <h6>{data.title}</h6>
                                </SubTitle>
                                <HeroTitleWrap>
                                    <h1>{data.slogan}</h1>
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
                                    {data.image ? (
                                        <span
                                            className="scene-layer"
                                            data-depth="0.20"
                                        >
                                            <Image
                                                src={data.image}
                                                alt=""
                                                style={{
                                                    maxWidth: 600,
                                                    aspectRatio: "1",
                                                }}
                                                width={400}
                                                height={400}
                                            />
                                        </span>
                                    ) : null}
                                    <div className="shape-circle scene">
                                        <span
                                            className="scene-layer"
                                            data-depth="0.40"
                                            ref={sceneEl}
                                        >
                                            <Image
                                                src="/assets/images/shape/circle_filled.png"
                                                alt="Hero Shape 2"
                                                loading="eager"
                                                style={{
                                                    maxWidth: 60,
                                                    aspectRatio: "1",
                                                }}
                                                width={61}
                                                height={61}
                                            />
                                        </span>
                                        <span
                                            className="scene-layer"
                                            data-depth="0.10"
                                        >
                                            <Image
                                                src="/assets/images/shape/circle1.png"
                                                alt="Hero Circle Image"
                                                loading="eager"
                                                width={400}
                                                height={400}
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
                                        <Image
                                            src="/assets/images/shape/1.png"
                                            alt="Hero Shape 1"
                                            loading="eager"
                                            fill
                                        />
                                    </span>
                                </div>

                                <DonateCircleWrap>
                                    <div className="pie-chart-circle"></div>
                                    <DonateContent>
                                        <div className="raised-amount">
                                            81,7797
                                        </div>
                                        <Image
                                            className="line-shape-img"
                                            src="/assets/images/shape/line-s2.png"
                                            alt="Image-Givest"
                                            loading="eager"
                                            fill
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
                            <Image
                                className="shape-img1"
                                src="/assets/images/shape/map1.png"
                                alt=""
                                loading="eager"
                                fill
                            />
                        </div>
                        <div className="shape-style2">
                            <Image
                                className="shape-img2"
                                src="/assets/images/shape/map2.png"
                                alt=""
                                loading="eager"
                                fill
                            />
                        </div>
                        <div className="shape-style3">
                            <Image
                                className="shape-img3"
                                src="/assets/images/shape/banner-line1.png"
                                alt=""
                                loading="eager"
                                fill
                            />
                        </div>
                        <div className="shape-style4">
                            <Image
                                className="shape-img3"
                                src="/assets/images/shape/banner-line2.png"
                                alt=""
                                loading="eager"
                                fill
                            />
                        </div>
                    </div>
                </SliderShape>
            </HomeSliderItem>
        </Section>
    );
};

export default Hero;
