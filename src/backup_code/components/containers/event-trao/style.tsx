import { themeGet } from "@styled-system/theme-get";
import styled from "@emotion/styled";

// Source
import { device, themeDefault as theme } from "@theme";

export const SectionArea = styled.section`
    transition: opacity 300ms ease-in-out,
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
export const StyledColunm = styled.div`
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

export const StyledMapArea = styled.div`
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
export const InfoContentArea = styled.div`
    margin-bottom: 20px;
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
`;
export const InfoItem = styled.div`
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
export const StyledIcon = styled.div`
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
export const InfoContent = styled.div`
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
export const StyledTitle = styled.h4`
    color: #fff;
    font-size: 25px;
    margin-bottom: 12px;
    ${device.large} {
        font-size: 35px;
    }
`;

export const InfoText = styled.p`
    color: white;
`;

export const UnpaidText = styled.span`
    color: red;
`;

export const MoneyText = styled.span`
    color: white;
    &.unpaid {
        color: red;
    }
`;

export const FormGroup = styled.div`
    margin-bottom: 20px;
`;

export const Subtitle = styled.h5`
    color: ${theme.colors.primary};
    display: inline-block;
    font-family: "Roboto", sans-serif;
    font-size: 18px;
    font-weight: 700;
    line-height: 1;
    margin: 0 0 12px;
    padding-left: 64px;
    position: relative;
    &:after {
        background-color: ${theme.colors.primary};
        content: "";
        height: 3px;
        left: 0;
        position: absolute;
        top: calc(50% - 1.5px);
        width: 43px;
    }
`;
