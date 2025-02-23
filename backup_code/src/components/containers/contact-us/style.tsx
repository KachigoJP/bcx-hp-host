import { themeGet } from "@styled-system/theme-get";
import styled from "@emotion/styled";

// Source
import { device } from "@theme";

export const SectionArea = styled.section`
    padding: 70px 0 280px;
    ${device.medium} {
        padding: 100px 0 300px;
    }
    ${device.large} {
        padding: 120px 0 300px;
    }
    ${device.xlarge} {
        padding: 150px 0 390px;
    }
`;
export const ContactColunm = styled.div`
    display: block;
    ${device.small} {
        padding: 0 100px;
    }
    ${device.medium} {
        padding: 0 100px;
    }

    ${device.large} {
        padding: 0 100px;
    }

    ${device.xlarge} {
        display: flex;
        padding-left: 83px;
        padding-right: 0;
    }

    ${device.xxlarge} {
        display: flex;
        padding-left: 183px;
        padding-right: 0;
    }
`;

export const ContactMapArea = styled.div`
    position: relative;
    width: 100%;
    height: auto;
    iframe {
        height: 100%;
        width: 100%;
    }
    ${device.medium} {
        height: 900px;
    }
    ${device.xlarge} {
        height: auto;
    }
`;
export const ContactInfoContentArea = styled.div`
    margin-bottom: 70px;
    min-width: auto;
    padding: 51px 20px 49px 20px;
    position: relative;
    top: auto;
    transform: none;
    width: 100%;
    transform: translate(0, 0);
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
    ${device.small} {
        left: 0;
        max-width: 500px;
        top: 50%;
    }
    ${device.medium} {
        padding: 53px 70px 49px 70px;
    }
    // ${device.medium} {
    //     transform: translate(0, -50%);
    //     position: absolute;
    //     top: 50%;
    // }
`;
export const ContactInfoItem = styled.div`
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    margin-bottom: 28px;
    padding-bottom: 25px;
    position: relative;
    &:last-child {
        border-bottom: none;
        padding-bottom: 0;
        marging-bottom: 0;
    }
`;
export const ContactIcon = styled.div`
    left: 30px;
    position: absolute;
    top: 29px;
    &:before {
        background-color: rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        content: "";
        height: 75px;
        left: -30px;
        position: absolute;
        top: -27px;
        width: 75px;
        z-index: -1;
    }
`;
export const ContactInfoContent = styled.div`
    padding-left: 128px;
    a {
        color: #fff;
        display: block;
        margin-bottom: 1px;
    }
    p {
        color: #fff;
        margin-bottom: 0;
    }
`;
export const ContactTitle = styled.h4`
    color: #fff;
    font-size: 25px;
    margin-bottom: 12px;
    ${device.large} {
        font-size: 35px;
    }
`;
