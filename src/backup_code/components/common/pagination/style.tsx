import styled from "@emotion/styled";
import { themeGet } from "@styled-system/theme-get";

export const NavItem = styled.li`
    background-color: #ececec;
    display: inline-block;
    height: 50px;
    line-height: 48px;
    margin-right: 10px;
    padding: 2px;
    width: 50px;
    &:hover {
        background: ${themeGet("colors.secondary")};
        background: linear-gradient(
            to left,
            ${themeGet("colors.secondary")} 0%,
            ${themeGet("colors.primary")} 100%
        );
    }

    &.disabled {
        position: relative;
        pointer-events: none;
        cursor: not-allowed;
        overflow: hidden;
        opacity: 0.4;
    }
`;
export const NavLink = styled.a`
    background-color: #fff;
    color: #001d23;
    display: inline-block;
    font-size: 15px;
    font-weight: 700;
    height: 100%;
    letter-spacing: 0;
    text-align: center;
    width: 100%;
    &.active {
        color: #fff;
        background: ${themeGet("colors.secondary")};
        background: linear-gradient(
            to left,
            ${themeGet("colors.secondary")} 0%,
            ${themeGet("colors.primary")} 100%
        );
    }
`;
