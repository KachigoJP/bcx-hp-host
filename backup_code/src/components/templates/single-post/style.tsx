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
export const PostDetailsContentWrap = styled.div`
    ${device.large} {
        padding-right: 50px;
    }
`;
export const PostDetailsBody = styled.div``;

export const Thumb = styled.div`
    margin-bottom: 30px;
    ${device.large} {
        margin-bottom: 40px;
    }
`;

export const Content = styled.div``;

export const MetaBox = styled.div`
    align-items: center;
    display: flex;
    justify-content: start;
    margin-bottom: 30px;
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
            line-height: 28px;
            margin-right: 10px;
            min-width: 28px;
            text-align: center;
            width: 28px;
            transition: 0.3s;
            -webkit-transition: 0.3s;
            -moz-transition: 0.3s;
            -ms-transition: 0.3s;
            -o-transition: 0.3s;
        }
    }
`;

export const Title = styled.h4`
    margin-bottom: 15px;
`;

export const SingleBlogContent = styled.div`
    blockquote{
        background-color: #f7f7f7;
        border-radius: 0;
        margin: 34px 0 35px;
        padding: 38px 50px 41px 50px;
        border: none;
        position: relative;
        z-index: 1;
        margin-bottom: 30px;
        p {
            color: #001d23;
            font-family: ${themeGet("fonts.heading")};
            font-size: 25px;
            font-weight: 400;
            font-style: italic;
            line-height: 1.4;
            background: ${themeGet("colors.gradient")};
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            position: relative;
            
        }
        &::before {
            content: ""
            font-size: 401.76px;
            position: relative;
            height: 100px;
            widht: 100px;
        }
    }
`;
export const CategorySocialContent = styled.div`
    align-items: center;
    display: flex;
    justify-content: space-between;
    margin-top: 41px;
    padding-bottom: 20px;
`;
export const PostSocialItems = styled.div`
    a {
        background-color: #f7f7f7;
        border-radius: 50%;
        color: #001d23;
        display: inline-block;
        font-size: 16px;
        height: 45px;
        line-height: 45px;
        margin-right: 6px;
        min-width: 45px;
        text-align: center;
        width: 45px;
        transition: 0.1s;
        -webkit-transition: 0.1s;
        -moz-transition: 0.1s;
        -ms-transition: 0.1s;
        -o-transition: 0.1s;
        &:hover {
            color: #fff;
            background: ${themeGet("colors.secondary")};
            background: ${theme.colors.gradient};
        }
    }
`;

export const PostCategoryItems = styled.div`
    span {
        color: #001d23;
        display: inline-block;
        font-weight: 700;
        margin-right: 1px;
    }
    a {
        color: ${theme.colors.primary};
        margin-left: 3px;
        &::after {
            contain: ","
            position: relative;
        }
    }
`;

export const CommentArea = styled.div`
    padding-top: 34px;
    ${device.large} {
        padding-top: 54px;
    }
`;

export const CommentTitle = styled.h4``;
