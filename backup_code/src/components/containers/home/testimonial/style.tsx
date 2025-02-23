import { themeGet } from "@styled-system/theme-get";
import styled from "@emotion/styled";

// Source
import { device } from "@theme";
import testimonialTitleBg from "@assets/images/photos/gallery1.jpg";

export const SectionArea = styled.section`
    padding: 100px 0 60px;
    background-color: #001d23;
    ${device.small} {
        padding: 100px 0 20px;
    }
    ${device.large} {
        padding: 150px 0 48px;
    }
`;

export const TitleWrap = styled.div`
    background: url(${testimonialTitleBg});
    align-items: center;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;

    justify-content: flex-start;
    left: auto;
    margin-bottom: 70px;
    min-height: auto;
    padding: 40px 0 40px 35px;
    position: relative;
    width: 100%;
    ${device.large} {
        justify-content: flex-end;
        left: 0;
        min-height: 530px;
        padding-right: 7%;
        position: absolute;
        width: calc(50% - 170px);
        padding-left: 44px;
    }

    ${device.medium} {
    }
    ${device.large} {
        width: calc(50% - 125px);
        padding-left: 44px;
    }
    ${device.xlarge} {
        width: calc(50% - 185px);
        padding-left: 70px;
    }

    &:after {
        content: "";
        height: 100%;
        left: 0;
        opacity: 0.902;
        position: absolute;
        top: 0;
        width: 100%;
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
    }
    .section-title {
        margin-bottom: 33px;
        max-width: 505px;
        position: relative;
        z-index: 1;
    }
    & .title {
        margin-bottom: 0;
        text-shadow: 3px 3px 0 rgb(0 29 35 / 45%);
    }
`;

export const TestimonialContent = styled.div`
    padding-right: 0px;
    ${device.medium} {
        padding-right: 0px;
        padding-left: 50px;
    }
    ${device.large} {
        padding-right: 0px;
        padding-left: 50px;
    }
    ${device.xlarge} {
        padding-right: 70px;
        padding-left: 0px;
    }
`;

export const NavigationWrap = styled.div`
    background-color: #192a2d;
    left: calc(103% + 1px);
    width: 4000px;
    position: relative;
    z-index: 999;
    top: -133px;
    display: none;

    ${device.mobile} {
        left: -5%;
        height: 100px;
        display: block;
        padding-left: 22px;
        top: 60px;
    }

    ${device.small} {
        left: calc(65% + 1px);
        height: 100px;
        display: block;
        padding-left: 22px;
    }
    ${device.medium} {
        left: calc(65% + 1px);
        height: 135px;
        padding-left: 52px;
    }
    ${device.large} {
        left: calc(70% + 1px);
    }
    ${device.xlarge} {
        left: calc(70% + 1px);
    }
    ${device.xxlarge} {
        left: calc(110% + 1px);
    }
    .swiper-button-next,
    .swiper-button-prev {
        border: 2px solid #283e42;
        border-radius: 50%;
        color: #fff;
        display: inline-block;
        font-size: 22px;
        height: 60px;
        left: auto;
        line-height: 52px;
        position: relative;
        right: auto;
        text-align: center;
        top: calc(50% - 8px);
        width: 60px;
        transition: 0.3s;
        -webkit-transition: 0.3s;
        -moz-transition: 0.3s;
        -ms-transition: 0.3s;
        -o-transition: 0.3s;
        &:focus {
            outline: none;
        }
        &:hover {
            background-color: #283e42;
        }
        &:after {
            display: none;
        }
    }
    .swiper-button-prev {
        margin-left: 17px;
    }
`;
