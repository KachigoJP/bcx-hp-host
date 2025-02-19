import { themeGet } from "@styled-system/theme-get";
import styled from "@emotion/styled";

// Source
import { device, themeDefault as theme } from "@theme";

export const BlogPostContentArea = styled.div``;
export const PostItemWrap = styled.div`
    margin-bottom: 50px;
    &:hover {
        & a {
            .post-hover {
                img {
                    transform: scale(1.15);
                }
            }
        }
    }
`;

export const PostThumb = styled.div`
    overflow: hidden;
    position: relative;
    a {
        display: flex;
    }
`;

export const MetaDate = styled.div`
    align-items: center;
    background-color: ${theme.colors.primary};
    display: flex;
    height: 92px;
    justify-content: center;
    padding-top: 8px;
    line-height: 23px;
    position: absolute;
    text-align: center;
    width: 92px;
    z-index: 1;
    bottom: 40px;
    left: 40px;
    top: auto;
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

export const ShapeLine = styled.div`
    border: 2px solid #fff;
    height: 92px;
    position: absolute;
    width: 92px;
    bottom: 30px;
    left: 50px;
    top: auto;
`;

export const ListBlogContent = styled.div`
    background-color: #f7f7f7;
    bottom: auto;
    left: auto;
    padding: 0;
    position: relative;
    right: auto;
    top: auto;
`;

export const ListBlogContentInner = styled.div`
    background-color: #f7f7f7;
    padding: 29px 20px 24px;
    ${device.xlarge} {
        padding: 44px 40px 43px;
    }
`;

export const MetaBox = styled.div`
    align-items: center;
    display: flex;
    justify-content: start;
    margin-bottom: 31px;
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
    .post-category {
        background-color: ${theme.colors.primary};
        color: #fff;
        display: inline-block;
        font-size: 13px;
        font-weight: 700;
        letter-spacing: 1.2px;
        margin-right: 25px;
        min-width: 105px;
        padding: 3px 11px 2px;
        text-align: center;
        text-transform: uppercase;
    }
    .post-author {
        color: #595959;
        display: inline-block;
        font-weight: 500;
        .icon {
            background-color: #e6e6e6;
            display: inline-block;
            height: 28px;
            line-height: 33px;
            margin-right: 10px;
            min-width: 28px;
            text-align: center;
            width: 28px;
            transition: 0.3s;
            .icon-img {
                max-width: none;
                transition: 0.1s;
            }
        }
    }
`;
export const Title = styled.h4`
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
`;
