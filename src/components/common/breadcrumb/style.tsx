import { themeGet } from "@styled-system/theme-get";
import styled from "@emotion/styled";

// Source
import { device } from "@theme";

import image from "../../../data/images/photos/bg-page-title.jpg";

export const PageBreadcrumbWrap = styled.div`
    background-image: url(${image});
    background-position: bottom center;
    background-repeat: no-repeat;
    background-size: cover;
    overflow: hidden;
    padding: 35px 0;
    position: relative;
    z-index: 1;
`;

export const PageTitleContent = styled.div`
    letter-spacing: 0;
    padding: 77px 0;
    text-align: center;
    & .breadcrumb__title {
        font-size: 38px;
        line-height: 1.414;
        margin-bottom: 6px;
        font-family: ${themeGet("fonts.heading")};
        color: #fff;
        ${device.large} {
            font-size: 58px;
        }
    }
    & .breadcrumb {
        display: flex;
        flex-wrap: wrap;
        padding: 0 0;
        margin-bottom: 1rem;
        list-style: none;
        justify-content: center;
        ol {
            list-style: none;
            display: flex;
            align-items: center;
            color: #fff;
            padding: 0;
            & .breadcrumb__separator {
                margin-right: 10px;
                margin-left: 10px;
            }
            .breadcrumb__link {
                color: #fff;
                font-size: 18px;
                font-weight: 700;
                margin-bottom: 8px;
                &.breadcrumb__link__active {
                    color: ${themeGet("colors.secondary")};
                }
            }
        }
    }
`;
