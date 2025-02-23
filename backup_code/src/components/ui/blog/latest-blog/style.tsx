import styled from "@emotion/styled";
import themeGet from "@styled-system/theme-get";

// Source
import { device, themeDefault as theme } from "@theme";

export const PostItemWrap = styled.div`
    margin-bottom: 150px;
    position: relative;
    ${device.large} {
        margin-bottom: 30px;
    }

    &:hover {
        .PostFooter {
            margin-bottom: 0;
            opacity: 1;
            padding-top: 0;
            visibility: visible;
        }
    }
`;

export const Thumb = styled.div`
    overflow: hidden;
    position: relative;
    a {
        display: block;
        position: relative;
    }
    img {
        width: 100%;
        transition: all 0.8s ease-in-out;
    }
`;

export const MetaDate = styled.div`
    align-items: center;
    background-color: ${theme.colors.primary};
    display: flex;
    height: 92px;
    justify-content: center;
    left: 35px;
    padding-top: 8px;
    line-height: 23px;
    position: absolute;
    text-align: center;
    top: 25px;
    width: 92px;
    z-index: 1;
    span {
        display: block;
        font-family: ${themeGet("fonts.heading")};
        font-weight: 400;
        font-size: 38px;
        letter-spacing: 0;
        line-height: 1;
        margin-bottom: 3px;
    }
    & a {
        color: #fff;
        font-size: 13px;
        font-weight: 700;
        display: block;
        letter-spacing: 1.2px;
        text-transform: uppercase;
    }
`;
export const PostShare = styled.div`
    font-size: 18px;
    position: relative;
    .icon-share {
        color: #aba5a5;
        img {
            filter: contrast(0.01);
            max-width: none;
            transition: 0.3s;
            -webkit-transition: 0.3s;
            -moz-transition: 0.3s;
            -ms-transition: 0.3s;
            -o-transition: 0.3s;
        }
    }
    ul {
        background-color: #fff;
        border-radius: 5px;
        box-shadow: 0px 6px 25px 0px rgb(171 181 189 / 25%);
        display: flex;
        margin: 0;
        opacity: 0;
        padding: 8px 3px 8px 17px;
        position: absolute;
        right: 0;
        top: 35px;
        visibility: hidden;
        transition: 0.3s;
        -webkit-transition: 0.3s;
        -moz-transition: 0.3s;
        -ms-transition: 0.3s;
        -o-transition: 0.3s;
        &::before {
            content: "";
            height: 40px;
            left: 0;
            position: absolute;
            right: 0;
            top: -33px;
            z-index: -1;
        }
        &::after {
            border-color: transparent transparent transparent #fff;
            border-style: solid;
            border-width: 9px;
            box-shadow: 0px 6px 25px 0px rgb(171 181 189 / 25%);
            content: "";
            position: absolute;
            right: 6px;
            top: -8px;
            transform: rotate(45deg);
        }
        li {
            margin-right: 13px;
            line-height: 1;
            a {
                color: #000;
                font-size: 12px;
            }
            .color-facebook {
                color: #425a99;
            }
            .color-twitter {
                color: #67acec;
            }
            .color-dribbble {
                color: #e93b88;
            }
            .color-pinterest {
                color: #b51122;
            }
        }
    }
    &:hover {
        ul {
            opacity: 1;
            visibility: visible;
        }
    }
`;

export const ShapeLine = styled.div`
    border: 2px solid #fff;
    height: 92px;
    left: 45px;
    position: absolute;
    top: 35px;
    width: 92px;
`;

export const LatestBlogContent = styled.div`
    background-color: #f7f7f7;
    bottom: -125px;
    overflow: hidden;
    padding-bottom: 1px;
    position: absolute;
    right: 5px;
    left: 5px;
    z-index: 1;
    transition: 0.3s;
    -webkit-transition: 0.3s;
    -moz-transition: 0.3s;
    -ms-transition: 0.3s;
    -o-transition: 0.3s;
    ${device.medium} {
        right: 35px;
        left: 35px;
    }
    ${device.large} {
        right: 15px;
        left: 15px;
    }
    ${device.xlarge} {
        right: 35px;
        left: 35px;
    }
`;

export const LatestBlogContentInner = styled.div`
    background-color: #f7f7f7;
    padding: 29px 20px 24px;
    ${device.xlarge} {
        padding: 29px 30px 24px;
    }
`;

export const MetaBox = styled.div`
    align-items: center;
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    .post-category {
        background-color: #e6e6e6;
        color: ${theme.colors.primary};
        font-size: 13px;
        font-weight: 700;
        letter-spacing: 1.2px;
        min-width: 105px;
        padding: 2.5px 11px;
        text-align: center;
        text-transform: uppercase;
        transition: 0.3s;
        -webkit-transition: 0.3s;
        -moz-transition: 0.3s;
        -ms-transition: 0.3s;
        -o-transition: 0.3s;
    }
`;
export const Title = styled.h5`
    margin-bottom: 0;
    line-height: 1.4;
`;
export const TextDetails = styled.p`
    margin: 5px 0 0;
`;

export const PostFooter = styled.div`
    align-items: center;
    background-color: #f7f7f7;
    display: flex;
    justify-content: space-between;
    margin-bottom: -71px;
    opacity: 1;
    padding: 1px 34px 32px;
    visibility: hidden;
    transition: 0.3s;
    -webkit-transition: 0.3s;
    -moz-transition: 0.3s;
    -ms-transition: 0.3s;
    -o-transition: 0.3s;
    .post-author {
        color: #001d23;
        font-weight: 700;
    }
`;
