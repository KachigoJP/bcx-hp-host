import styled from "@emotion/styled";
import { themeGet } from "@styled-system/theme-get";

// Source
import { device } from "@theme";

export const SectionTitleArea = styled.div`
    position: relative;
`;
export const SubTitle = styled.h5`
    color: ${themeGet("colors.primary")};
    display: inline-block;
    font-family: ${themeGet("fonts.body")};
    font-size: ${themeGet("fontSize.h5.0")};
    font-weight: 700;
    line-height: 1;
    margin: 0 0 12px;
    padding-left: 64px;
    position: relative;

    &:after {
        background-color: ${themeGet("colors.primary")};
        content: "";
        height: 3px;
        left: 0;
        position: absolute;
        top: calc(50% - 1.5px);
        width: 43px;
    }
    &.line-white-color {
        color: ${themeGet("colors.white")};
        z-index: 1;
        &:after {
            background-color: ${themeGet("colors.white")};
        }
    }
`;
export const TitleBoxArea = styled.div`
    position: relative;

    .img-shape {
        left: 50%;
        width: 90px;
        position: absolute !important;
        top: 50%;
        transform: translate(-50%, -50%);
        -webkit-transform: translate(-50%, -50%);
        -moz-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        -o-transform: translate(-50%, -50%);
        ${device.small} {
            width: 120px;
        }
        ${device.medium} {
            width: 140px;
        }
        ${device.large} {
            width: 185px;
        }
    }
`;
export const Title = styled.h2`
    font-size: ${themeGet("fontSize.h2.0")};
    ${device.small} {
        font-size: ${themeGet("fontSize.h2.1")};
    }
    ${device.medium} {
        font-size: ${themeGet("fontSize.h2.2")};
    }
    ${device.large} {
        font-size: ${themeGet("fontSize.h2.3")};
    }
    line-height: 1.25;
    margin-bottom: 0;
    margin-top: 0;
    position: relative;
    z-index: 1;
    span {
        background: ${themeGet("colors.secondary")};
        background: ${themeGet("colors.gradient")};
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    &.title-style {
        margin-top: 39px;
        position: relative;
        z-index: 1;
    }
`;
