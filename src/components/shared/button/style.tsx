import { themeGet } from "@styled-system/theme-get";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { Link } from "gatsby";

// Source
import { device, Theme } from "@theme";

export const createStyles = (
    theme: Theme,
    color: string,
    size: string,
    shape: string,
    variant: string
) => css`
    cursor: pointer;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    white-space: normal;
    box-sizing: border-box;
    transition: all 0.3s ease;
    font-weight: 600;
    text-transform: capitalize;
    text-decoration: none;
    line-height: 1;
    position: relative;
    i {
        font-size: 15px;
        margin-left: 5px;
        margin-top: 2px;
    }
    span {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 10px;
        .icon-img {
            margin-left: 12px;
            img {
                max-width: none;
                width: auto;
            }
        }
    }

    ${color === "primary" &&
    css`
        background: ${theme.colors.primary};
        color: #fff;
        &:hover {
            color: #fff;
        }
    `}
    ${color === "secondary" &&
    css`
        background: ${theme.colors.secondary};
        color: #fff;
    `}
    ${color === "light" &&
    css`
        background-color: transparent;
        border-color: #fff;
        padding: 10px 20px;
        font-size: 15px;
        min-height: 45px;
        min-width: 150px;
    `}
    
    ${color === "outlined-transparent" &&
    css`
        background-color: transparent;
    `}
    
    ${color === "border-normal" &&
    css`
        border: 2px ​solid #ddd;
    `}

    
    ${color === "border-gradient" &&
    css`
        display: inline-block;
        padding: 2px !important;
        z-index: 1;
        background: ${themeGet("colors.secondary")(theme)};
        background: ${theme.colors.gradient};
        min-height: 40px;
        line-height: 40px;
        span {
            display: block;
            background: ${themeGet("colors.secondary")(theme)};
            background: ${theme.colors.gradient};
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            transition: 0.3s;
            -webkit-transition: 0.3s;
            border-radius: 19px;
            text-align: center;
            line-height: 2.3;
        }
        &:before {
            background-color: #f7f7f7;
            content: "";
            display: block;
            height: calc(100% - 4px);
            left: 2px;
            position: absolute;
            top: 2px;
            width: calc(100% - 4px);
            z-index: -1;
            transition: 0.3s;
            -webkit-transition: 0.3s;
            -moz-transition: 0.3s;
            -ms-transition: 0.3s;
            -o-transition: 0.3s;
            border-radius: 19px;
        }
    `}
    ${color === "theme-gradient" &&
    css`
        left: 50%;
        opacity: 0;
        position: absolute;
        top: 50%;
        visibility: hidden;
        transform: translate(-50%, -50%);
        transition: 0.3s;
        background: ${theme.colors.gradient};
        color: #fff;
        display: inline-block;
        border: transparent;
        font-weight: 600;
        line-height: 1.375;
    `}

    ${color === "gradient" &&
    css`
        background: ${theme.colors.gradient};
        color: #fff;
        display: inline-block;
        position: relative;
        transition: 0.3s;
        z-index: 1;
        overflow: hidden;
        text-align: center;
        &:before {
            background-color: rgba(255, 255, 255, 0.2);
            border-radius: 50%;
            bottom: -40px;
            content: "";
            height: 65px;
            left: -27px;
            position: absolute;
            width: 65px;
            transition: 0.5s;
            z-index: -1;
        }
        &:after {
            background-color: rgba(255, 255, 255, 0.2);
            border-radius: 50%;
            content: "";
            height: 65px;
            position: absolute;
            right: -27px;
            top: -40px;
            width: 65px;
            transition: 0.5s;
            z-index: -1;
        }
        &:hover {
            color: #fff;
            &:before {
                border-radius: 32.5px;
                bottom: 0;
                height: 100%;
                left: 0;
                opacity: 0;
                width: 100%;
            }
            &:after {
                border-radius: 32.5px;
                height: 100%;
                opacity: 0;
                right: 0;
                top: 0;
                width: 100%;
            }
        }
    `}
    ${size === "xsmall" &&
    css`
        border-radius: 19px;
        font-size: 15px;
        line-height: 1.5;
        min-height: 38px;
        min-width: 105px;
        font-size: ${theme.fontSize.body};
    `}
    ${size === "small" &&
    css`
        font-size: 15px;
        min-width: 150px;
        padding: 10px 18px;
        font-width: 500;
        font-size: ${theme.fontSize.body} ${device.small} {
            font-size: 13px;
            min-width: 135px;
            padding: 10px 18px;
        }
        i {
            font-size: 12px;
        }
    `}
    ${size === "medium" &&
    css`
        font-size: 14px;
        font-weight: 600;
        line-height: 1.375;
        min-width: 130px;
        height: 51px;
        line-height: 51px;
        font-size: ${theme.fontSize.body} ${device.small} {
            min-width: 155px;
            padding: 15px 25px;
            font-size: 14px;
            height: 51px;
            line-height: 20px;
        }
        ${device.medium} {
            min-width: 155px;
            padding: 15px 25px;
            font-size: 14px;
            height: 51px;
            line-height: 20px;
        }
        ${device.large} {
            min-width: 200px;
            padding: 19px 37px;
            font-size: 17px;
            height: 65px;
            line-height: 26px;
        }
    `}
    ${shape === "rounded" &&
    css`
        border-radius: 32.5px;
    `}

    ${variant === "outlined" &&
    css`
        background: transparent;
        color: ${theme.colors.text};
        border: 2px solid #d7d7d7;
        &:hover {
            background: ${theme.colors.gradient};
            border: 2px solid ${theme.colors.gradient};
            color: ${theme.colors.white};
        }
    `}
`;

export const StyledAnchor = styled.a``;

export const StyledLink = styled(Link)``;

export const StyledButton = styled.button``;

export const StyledSpan = styled.span`
    margin: 0 10px;
`;
