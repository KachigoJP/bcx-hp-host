import { themeGet } from "@styled-system/theme-get";
import styled from "@emotion/styled";

// Source
import { device, themeDefault as theme } from "@theme";

export const BlogDetailsArea = styled.section`
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
export const CausesDetailsContent = styled.div`
    ${device.large} {
        padding-right: 50px;
    }
    .row {
        margin-left: -15px;
        margin-right: -15px;
    }
`;
export const CausesDetails = styled.div``;
export const Thumb = styled.div``;
export const CauseTitle = styled.h4`
    margin-bottom: 25px;
    margin-top: 25px;
`;
export const DonateInfoWrap = styled.div`
    border-bottom: 1px solid #ededed;
    border-top: 1px solid #ededed;
    margin-bottom: 34px;
    padding: 10px 0;
`;

export const DonateInfo = styled.ul`
    display: flex;
    justify-content: space-between;
    margin-bottom: 0;
    padding-right: 3px;
`;
export const InfoItem = styled.li`
    background-color: #f7f7f7;
    font-family: ${themeGet("fonts.heading")};
    min-width: 75px;
    min-width: 90px;
    padding: 7px 13px 6px;
    -webkit-transition: 0.3s;
    -moz-transition: 0.3s;
    -ms-transition: 0.3s;
    -o-transition: 0.3s;
    ${device.small} {
        min-width: 80px;
        padding: 7px 5px 6px;
    }
    ${device.medium} {
        min-width: 100px;
        padding: 7px 13px 6px;
    }
`;
export const InfoItemTitle = styled.span`
    color: #001d23;
    font-size: 14px;
    margin-bottom: 8px;
    display: block;
    line-height: 1;
`;
export const Amount = styled.span`
    color: ${theme.colors.primary};
    font-size: 16px;
    background: ${themeGet("colors.secondary")};
    background: ${themeGet("colors.gradient")};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    display: block;
    line-height: 1;
    ${device.xlarge} {
        font-size: 20px;
    }
`;
export const ShortTitle = styled.h4``;
export const SingleDetailsText = styled.p``;

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
        background-color: ${themeGet(
            "colors.secondary"
        )}Get("colors.secondary")} !important;
    }
`;
export const DocumentItemTitle = styled.h6`
    color: #fff;
`;
