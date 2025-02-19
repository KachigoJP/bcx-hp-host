import { themeGet } from "@styled-system/theme-get";
import styled from "@emotion/styled";

// Source
import { device, themeDefault } from "@theme";

export const FooterWrap = styled.footer`
    background-color: #001d23;
    padding: 0 15px 33px;
    position: relative;
`;

export const FooterMain = styled.div`
    background-color: #f7f7f7;
    margin: 0px auto -170px;
    padding: 50px 0 40px;
    max-width: 1555px;
    position: relative;
    z-index: 1;
    transform: translate(0, -240px);
    ${device.medium} {
        padding: 50px 0 40px;
        margin: 0px auto -175px;
    }
    ${device.large} {
        padding: 102px 0 30px;
        margin: 0px auto -175px;
    }
    ${device.xlarge} {
        padding: 152px 0 80px;
        margin: 0px auto -175px;
    }
`;

export const WidgetItem = styled.div`
    position: relative;
    z-index: 1;
    margin-bottom: 40px;
    & .menu-wrap-two-column {
        padding-left: 0px;
        ${device.large} {
            padding-left: 37px;
        }
    }
    ${device.large} {
        margin-bottom: 62px;
    }
`;
export const AboutWidget = styled.div`
    padding-right: 0px;
    ${device.medium} {
        padding-right: 70px;
    }
    .footer-logo {
        display: block;
        margin-bottom: 36px;
    }
`;
export const AboutWidgetText = styled.p`
    font-size: 25px;
    margin-bottom: 25px;
`;

export const WidgetTotalRaised = styled.div`
    margin-bottom: 25px;
`;
export const RaisedTitle = styled.h4`
    font-size: 25px;
    margin-bottom: 18px;
`;
export const TaisedAmount = styled.div`
    font-family: ${themeGet("fonts.heading")};
    font-size: 30px;
    ${device.medium} {
        font-size: 40px;
    }
    ${device.large} {
        font-size: 50px;
    }
    ${device.xlarge} {
        font-size: 60px;
    }
    line-height: 1;
    background: ${themeGet("colors.secondary")};
    background: ${themeDefault.colors.gradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
`;
export const WidgetTitle = styled.h4`
    padding-left: 75px;
    position: relative;
    color: #001d23;
    font-size: 20px;
    line-height: 1;
    margin-bottom: 34px;
    margin-top: 17px;
    &:before {
        background-color: ${themeDefault.colors.primary};
        content: "";
        height: 4px;
        left: 0;
        position: absolute;
        top: 50%;
        width: 55px;
    }
    ${device.large} {
        margin-bottom: 54px;
        font-size: 30px;
    }
`;
export const WidgetGallery = styled.div`
    padding-left: 5px;
    padding-right: 15px;
    ${device.large} {
        padding-right: 45px;
    }
`;
export const GalleryItem = styled.div`
    margin-bottom: 10px;
    position: relative;
    display: flex;
    img,
    svg {
        vertical-align: middle;
    }
    .icon {
        color: #fff;
        height: 100%;
        opacity: 0;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        background: ${themeGet("colors.secondary")};
        background: ${themeDefault.colors.gradient};
        transition: 0.3s;
        -webkit-transition: 0.3s;
        -moz-transition: 0.3s;
        -ms-transition: 0.3s;
        -o-transition: 0.3s;

        & i {
            font-size: 24px;
            left: 50%;
            position: absolute;
            top: 50%;
            transform: translate(-50%, -50%);
            transition: 0.3s;
            -webkit-transition: 0.3s;
            -moz-transition: 0.3s;
            -ms-transition: 0.3s;
            -o-transition: 0.3s;
        }
    }
    &:hover .icon {
        opacity: 0.9;
    }
`;
export const WidgetMenuWrap = styled.nav``;

export const NavMenu = styled.ul``;

export const NavItem = styled.li`
    margin-bottom: 8px;
    position: relative;
`;

export const CopyrightText = styled.p`
    color: #f4faff;
    font-size: 16px;
    padding-bottom: 15px;
    & > svg {
        width: 15px;
        height: 15px;
        path {
            fill: red;
        }
    }
    ${device.medium} {
        padding: 0;
    }
    a {
        color: ${themeGet("colors.primary")};
    }
`;

export const FooterShapeLayer = styled.div`
    bottom: -15px;
    left: 50%;
    pointer-events: none;
    position: absolute;
    width: 110%;
    transform: translate(-50%, 0px);
    -webkit-transform: translate(-50%, 0px);
    -moz-transform: translate(-50%, 0px);
    -ms-transform: translate(-50%, 0px);
    -o-transform: translate(-50%, 0px);
    & img {
        max-width: none;
    }
`;
