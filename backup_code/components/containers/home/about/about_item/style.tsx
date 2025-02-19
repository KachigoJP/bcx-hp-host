import styled from "@emotion/styled";

// Source
import { device, themeDefault as theme } from "@theme";

export const SectionArea = styled.section`
    padding: 46px 0 45px;
    ${device.small} {
        padding: 48px 0 48px;
    }
    ${device.medium} {
        padding: 88px 0 92px;
    }
    ${device.large} {
        padding: 88px 0 92px;
    }
    ${device.xlarge} {
        padding: 146px 0 15px;
    }

    position: relative;

    &:before {
        background-color: #f7f7f7;
        bottom: 0;
        content: "";
        height: calc(100% + 225px);
        left: 0;
        position: absolute;
        width: calc(50% - 126px);
        z-index: -1;
    }
    & .img-one {
        display: none !important;
        ${device.small} {
            display: inline-block !important;
        }
        ${device.large} {
            display: none !important;
        }
        ${device.xlarge} {
            display: inline-block !important;
        }
    }
`;

export const LayerStyle = styled.div`
    margin-top: 25px;
    position: relative;
    &:before {
        background-color: #fff;
        border-radius: 50%;
        content: "";
        height: 546px;
        left: -201px;
        position: absolute;
        top: -331px;
        width: 546px;
        z-index: -1;
    }

    .row > [class*="col-"] {
        padding-right: 0;
        padding-left: 0;
    }
    .row.m-0 {
        margin: 0 !important;
    }
    .img-two {
        margin-left: 0px;
        ${device.small} {
            margin-left: 0px;
        }
        ${device.large} {
            margin-left: 0px;
        }
        ${device.xlarge} {
            margin-left: -23px;
        }
    }
`;
export const Thumb = styled.div``;

export const AboutTextStyle = styled.p`
    color: #464444;
    font-family: "Roboto", sans-serif;
    font-size: 22px;
    line-height: 1.364;
    margin-bottom: 26px;
    margin-right: -10px;
    position: relative;
    &:before {
        background-color: ${theme.colors.primary};
        content: "";
        height: 75px;
        left: -29px;
        position: absolute;
        top: 7px;
        width: 4px;
    }
`;
export const AboutContent = styled.div``;

export const LlistIconStyle = styled.ul`
    align-items: center;
    display: block;
    color: #001d23;
    font-size: 15px;
    font-weight: 700;
    justify-content: space-between;
    line-height: 25px;
    margin-bottom: 42px;
    margin-top: 29px;
    position: relative;
    ${device.small} {
        display: flex;
    }
`;

export const ListLi = styled.li`
    align-items: flex-start;
    display: flex;
    margin-bottom: 10px;
    .icon-img {
        margin-right: 20px;
        max-width: none;
        position: relative;
        top: 6px;
    }
    &.line-center {
        background-color: ${theme.colors.primary};
        height: 43px;
        position: relative;
        top: -2px;
        width: 4px;
        display: none;
        ${device.small} {
            display: inline-block;
        }
    }
`;
export const ListText = styled.span``;
