import { themeGet } from "@styled-system/theme-get";
import styled from "@emotion/styled";

// Source
import { device } from "@theme";

export const HeaderNavigationArea = styled.div`
    display: none;
    ${device.xlarge} {
        display: block;
    }
`;
export const Navbar = styled.ul`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    padding-left: 0;
    margin-bottom: 0;
    list-style: none;
`;
export const Navitem = styled.li`
    display: inline-block;
    padding: 3px 0;
    &:first-of-type {
        padding-left: 0;
    }
    a {
        padding: 7px 34px;
        color: #001d23;
        display: block;
        font-size: 17px;
        font-weight: 500;
        line-height: 22px;
        padding: 7px 25px;
        position: relative;
        &:hover {
            color: ${themeGet("colors.primary")};
        }
    }

    &.has-submenu {
        padding-right: 10px;
        position: relative;
        > .submenu-nav {
            padding: 15px 0 15px;
            position: absolute;
            top: 100%;
            transform: translateY(50px);
            transition: 0.4s;
            opacity: 0;
            visibility: hidden;
            min-width: 250px;
            margin-top: 42px;
            z-index: 3;
            background-color: #fff;
            border: none;
            border-radius: 0 0 5px 5px;
            box-shadow: 0px 20px 80px 0px rgb(171 181 189 / 35%);
            left: -10px;
            margin-top: 25px;
            min-width: 195px;

            &:before {
                content: "";
                position: absolute;
                height: 56px;
                width: 100%;
                left: 0;
                bottom: 100%;
                height: 40px;
            }
            > li {
                padding: 9px 25px;
                > a {
                    color: #0e0e0e;
                    display: block;
                    font-weight: 400;
                    font-size: 14px;
                    letter-spacing: inherit;
                    text-transform: capitalize;
                    padding: 0;
                    &:hover {
                        color: ${themeGet("colors.primary")};
                    }
                }
            }
        }
        &:hover {
            > .submenu-nav {
                transform: none;
                opacity: 1;
                visibility: visible;
            }
        }
    }
`;
