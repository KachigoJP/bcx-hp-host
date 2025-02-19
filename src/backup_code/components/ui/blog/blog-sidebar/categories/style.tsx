import { themeGet } from "@styled-system/theme-get";
import styled from "@emotion/styled";

export const Widgetcategory = styled.div`
    a {
        background-color: #fff;
        color: #595959;
        display: block;
        font-size: 15px;
        font-weight: 500;
        margin-bottom: 10px;
        padding: 13px 20px 10px;
        position: relative;
        transition: 0.2s;
        -webkit-transition: 0.2s;
        -moz-transition: 0.2s;
        -ms-transition: 0.2s;
        -o-transition: 0.2s;
        span {
            float: right;
        }
        &:after {
            background-color: #fff;
            border-radius: 50%;
            content: "";
            height: 6px;
            left: 20px;
            opacity: 0;
            position: absolute;
            top: 50%;
            width: 6px;
            transform: translate(0px, -50%);
            -webkit-transform: translate(0px, -50%);
            -moz-transform: translate(0px, -50%);
            -ms-transform: translate(0px, -50%);
            -o-transform: translate(0px, -50%);
            transition: 0.2s;
            -webkit-transition: 0.2s;
            -moz-transition: 0.2s;
            -ms-transition: 0.2s;
            -o-transition: 0.2s;
        }
        &:hover {
            &:after {
                opacity: 1;
            }
            color: #fff;
            padding-left: 38px;
            background: ${themeGet("colors.secondary")};
            background: ${themeGet("colors.gradient")};
        }
    }
`;
