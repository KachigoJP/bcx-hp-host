import { themeGet } from "@styled-system/theme-get";
import styled from "@emotion/styled";

// Source
import { device } from "@theme";
import BannerTitleShape from "@data/images/shape/banner-title-shape.png";

export const Section = styled.section`
    position: relative;
`;

export const HomeSliderItem = styled.div`
    height: auto;
    align-items: center;
    display: flex;
    padding-top: 40px;
    position: relative;
    @media (min-width: 1400px) and (max-width: 1799px) {
        .container {
            max-width: 1397px;
        }
    }
    ${device.medium} {
        height: 500px;
        padding-top: 30px;
    }
    ${device.large} {
        height: 650px;
        padding-top: 60px;
    }
    ${device.xlarge} {
        height: 800px;
        padding-top: 124px;
    }
    ${device.xxlarge} {
        height: 900px;
    }
`;
export const Content = styled.div`
    margin-top: 27px;
    @media (min-width: 1400px) and (max-width: 1799px) {
        max-width: 734px;
    }
`;

export const SubTitle = styled.div`
    margin-bottom: 28px;
    display: flex;
    justify-content: start;
    align-items: center;
    float: left;
    width: 100%;

    img {
        margin-right: 14px;
        position: relative;
        top: -9px;
        vertical-align: middle;
    }
    h6 {
        margin-left: 14px;
        display: inline-block;
        font-family: ${themeGet("fonts.body")};
        font-size: 22px;
        font-weight: 700;
        margin: 0;
        margin-left: 20px;
        background: ${themeGet("colors.gradient")};
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    .logo {
        width: 50px;
    }
`;
export const HeroTitleWrap = styled.div`
    margin-bottom: 30px;
    h1 {
        font-size: ${themeGet("fontSize.h1.0")};
        line-height: 1.2;
        ${device.medium} {
            font-size: ${themeGet("fontSize.h1.2")};
        }
        ${device.large} {
            font-size: ${themeGet("fontSize.h1.3")};
        }
        ${device.xlarge} {
            font-size: ${themeGet("fontSize.h1.4")};
            line-height: 1.0934;
        }
        ${device.xxlarge} {
            font-size: ${themeGet("fontSize.h1.5")};
            line-height: 1.0934;
        }
        ${device.xxlarge} {
            font-size: ${themeGet("fontSize.h1.6")};
            line-height: 1.0934;
        }

        span {
            display: inline-block;
            position: relative;
            z-index: 1;
            &:before {
                background-image: url(${BannerTitleShape});
                background-repeat: no-repeat;
                content: "";
                display: block;
                height: 100%;
                left: 50%;
                background-position: 0 5px;
                background-size: cover;
                min-width: auto;
                width: 110%;
                position: absolute;
                top: 50%;
                z-index: -1;
                transform: translate(-50%, -50%);
                -webkit-transform: translate(-50%, -50%);
                -moz-transform: translate(-50%, -50%);
                -ms-transform: translate(-50%, -50%);
                -o-transform: translate(-50%, -50%);
            }
            ${device.large} {
                &:before {
                    background-position: 13px 9px;
                    background-size: cover;
                    min-width: 234px;
                    width: 100%;
                }
            }
            ${device.xlarge} {
                &:before {
                    background-position: 13px 9px;
                    background-size: cover;
                    min-width: 304px;
                    width: 100%;
                }
            }
            ${device.xxlarge} {
                &:before {
                    background-position: 13px 9px;
                    background-size: cover;
                    min-width: 334px;
                    width: 100%;
                }
            }
        }
    }
`;

export const LayerStyle = styled.div`
    margin-top: 54px;
    position: relative;

    ${device.small} {
        max-width: 380px;
        margin-left: auto;
        mrgin-right: auto;
        right: 60px;
        margin-top: 94px;
    }
    ${device.medium} {
        right: 0px;
        max-width: 100%;
    }
    ${device.large} {
        right: 0px;
        max-width: 100%;
    }

    ${device.xlarge} {
        right: 40px;
        max-width: 100%;
    }
    ${device.xxlarge} {
        right: 100px;
        max-width: 100%;
    }
    ${device.xxxlarge} {
        margin-top: 0;
        right: 30px;
        top: 10px;
    }

    @media (min-width: 1799px) {
        margin-top: 54px;
        position: relative;
        right: -86px;
    }
    .thumb {
        border-radius: 50%;
        img {
            border-radius: 50%;
            max-width: none !important;
            ${device.xxlarge} {
                width: auto;
            }
        }
        .shape-circle {
            border-radius: 50%;
            height: 100%;
            left: 15px;
            position: absolute;
            top: -86px;
            width: 100%;
            pointer-events: none;
            display: none;
            ${device.small} {
                display: block;
            }
            .scene-layer {
                img {
                    ${device.xxlarge} {
                        width: auto;
                    }
                }
            }
            .circle-img {
                position: absolute !important;
                right: -30px;
                top: 109px;
                ${device.small} {
                    right: -30px;
                    width: 60px;
                }
                ${device.medium} {
                    right: -30px;
                    width: 60px;
                }
                ${device.large} {
                    right: -30px;
                    width: 60px;
                }
                ${device.xlarge} {
                    right: -30px;
                    width: auto;
                }
                ${device.xxlarge} {
                    right: -70px;
                }
                @media (min-width: 1799px) {
                    right: -170px;
                }
            }
        }
    }
    .shape-style1 {
        position: absolute;
        right: 0;
        top: -90px;
        display: none;
        ${device.small} {
            right: -11px;
            top: -91px;
            max-width: 80px;
            display: block;
        }
        ${device.medium} {
            right: -11px;
            top: -91px;
            max-width: 80px;
        }
        ${device.large} {
            right: -11px;
            top: -91px;
            max-width: 100px;
        }
        ${device.xlarge} {
            right: -11px;
            top: -91px;
            max-width: 100px;
        }
        ${device.xxlarge} {
            right: -53px;
            top: -138px;
            max-width: 100%;
        }

        @media (min-width: 1600px) and (max-width: 1799px) {
            right: 0px;
        }
    }
`;

export const SliderShape = styled.div`
    .slider-shape .shape-style1 {
        position: absolute;
        right: 0;
        top: 0;
        z-index: -1;
    }
    .slider-shape .shape-style2 {
        left: 0;
        position: absolute;
        top: 0;
        z-index: -1;
    }
    @media only screen and (max-width: 1199px) {
        .slider-shape .shape-style2 {
            left: -500px;
        }
    }
    @media only screen and (max-width: 991px) {
        .slider-shape .shape-style2 {
            left: -800px;
            top: -100px;
        }
    }
    .slider-shape .shape-style3 {
        position: absolute;
        right: calc(72% + 14px);
        top: 0;
        z-index: 0;
    }
    @media only screen and (max-width: 767px) {
        .slider-shape .shape-style3 {
            display: none;
        }
    }
    .slider-shape .shape-style4 {
        left: 0;
        position: absolute;
        top: 0;
        z-index: 0;
    }
    @media (max-width: 1799px) {
        .slider-shape .shape-style4 {
            top: -130px;
        }
    }
    @media only screen and (max-width: 1199px) {
        .slider-shape .shape-style4 {
            top: -150px;
        }
    }
    @media only screen and (max-width: 991px) {
        .slider-shape .shape-style4 {
            top: -200px;
        }
    }
    @media only screen and (max-width: 767px) {
        .slider-shape .shape-style4 {
            display: none;
        }
    }
`;

export const DonateCircleWrap = styled.div`
    bottom: -95px;
    height: 230px;
    width: 230px;
    left: -127px;
    padding: 25px;
    position: absolute;
    border-radius: 50%;
    background: ${themeGet("colors.secondary")};
    background-image: -ms-linear-gradient(
        -30deg,
        ${themeGet("colors.secondary")} 0%,
        ${themeGet("colors.primary")} 100%
    );
    background: linear-gradient(
        -30deg,
        ${themeGet("colors.secondary")} 0%,
        ${themeGet("colors.primary")} 100%
    );
    display: none;
    ${device.small} {
        display: block;
    }
    ${device.medium} {
        bottom: -95px;
        height: 196px;
        width: 196px;
        left: -83px;
        padding: 5px;
    }
    ${device.large} {
        bottom: -74px;
        height: 265px;
        width: 265px;
        left: -127px;
        padding: 25px;
    }
    ${device.xxlarge} {
        bottom: -39px;
        height: 340px;
        width: 340px;
        left: -169px;
        padding: 43px;
    }

    .pie-chart-circle {
        border: 4px solid #fff;
        border-radius: 100000px;
        height: 100%;
    }
`;
export const DonateContent = styled.div`
    border-radius: 50%;
    color: #fff;
    left: 50%;
    text-align: center;
    position: absolute;
    top: calc(50% + 2px);
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    .raised-amount {
        font-family: ${themeGet("fonts.heading")};
        font-size: 26px;
        line-height: 1;
        margin-bottom: 12px;
        ${device.large} {
            font-size: 50px;
        }
    }
    .donate-title {
        color: #fff;
        font-size: 16px;
        margin: 0;
        ${device.large} {
            font-size: 20px;
        }
    }
`;
