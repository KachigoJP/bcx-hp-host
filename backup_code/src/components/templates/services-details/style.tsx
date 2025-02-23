import { themeGet } from "@styled-system/theme-get";
import styled from "@emotion/styled";

// Source
import { device, themeDefault as theme } from "@theme";

export const ServicesDetailsArea = styled.section`
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
export const ServicesDetailsContent = styled.div`
    ${device.large} {
        padding-right: 50px;
    }
    .row {
        margin-left: -15px;
        margin-right: -15px;
    }
`;
export const ServicesDetails = styled.div``;
export const Thumb = styled.div``;
export const ServicesTitle = styled.h4`
    margin-bottom: 25px;
    margin-top: 25px;
`;

export const DocumentItem = styled.a`
    align-items: center;
    background-color: ${theme.colors.primary};
    display: flex;
    height: 75px;
    justify-content: space-between;
    margin-bottom: 23px;
    margin-top: 10px;
    padding: 15px 30px;
    width: 100%;
    &.bgcolor-theme2 {
        background-color: ${themeGet("colors.secondary")} !important;
    }
`;
export const DocumentItemTitle = styled.h6`
    color: #fff;
`;
