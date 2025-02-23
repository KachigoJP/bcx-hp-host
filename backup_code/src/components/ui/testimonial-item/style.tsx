import { themeGet } from "@styled-system/theme-get";
import styled from "@emotion/styled";

// Source
import { themeDefault as theme } from "@theme";

export const ClientThumbWrap = styled.div`
    margin-bottom: 39px;
    position: relative;
    z-index: 1;
`;

export const ClientThumb = styled.div`
    background-color: #13373e;
    border-radius: 50%;
    height: 129px;
    padding: 4px;
    width: 129px;
    & img {
        border-radius: 50%;
        aspect-ratio: 1;
    }
`;

export const QuoteIcon = styled.div`
    font-size: 280px;
    font-family: "Roboto", sans-serif;
    left: 98px;
    line-height: 212px;
    position: absolute;
    top: 24px;
    z-index: -1;
    background: ${themeGet("colors.secondary")};
    background: ${theme.colors.gradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
`;

export const ClientContent = styled.div`
    margin-bottom: 38px;
    position: relative;
    max-width: 500px;
    max-height: 200px;
    overflow: hidden;
`;
export const ClientText = styled.p`
    color: #c2c2c2;
    font-size: 25px;
    font-family: ${themeGet("fonts.heading")};
    line-height: 1.6;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
`;
export const ClientInfo = styled.div`
    .shape-line-img {
        margin-bottom: 31px;
        width: auto;
    }
`;

export const ClientName = styled.h4`
    color: #fff;
    font-size: 27px;
    margin-bottom: 29px;
`;
export const ClientDesignation = styled.h6`
    color: ${theme.colors.primary};
    font-family: ${themeGet("fonts.heading")};
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 1px;
    margin: 0;
    text-transform: uppercase;
`;
