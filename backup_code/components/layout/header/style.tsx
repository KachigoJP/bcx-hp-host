import { themeGet } from "@styled-system/theme-get";
import styled from "@emotion/styled";

// Source
import { device } from "@theme";

export const Span = styled.span`
    color: ${themeGet("colors.success")};
    font-family: ${themeGet("fonts.heading")};
`;

export const HeaderTop = styled.div`
    background-color: #fff;
    box-shadow: 0px 15px 35px 0px rgb(0 29 35 / 2%);
    border: 0 !important;
    padding: 15px 0;
    position: relative;
    z-index: 999;
    ${device.medium} {
        padding: 10px 0;
    }
    ${device.large} {
        padding-right: 25px;
    }
    ${device.xxlarge} {
        .container {
            max-width: 1397px;
        }
    }
    &.is-sticky {
        animation: 300ms ease-in-out 0s normal none 1 running fadeInDown;
        -webkit-animation: 300ms ease-in-out 0s normal none 1 running fadeInDown;
        background-color: #fff;
        box-shadow: 0 8px 20px 0 rgb(0 0 0 / 10%);
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        z-index: 9999;
    }
`;

export const HeaderMenuArea = styled.div`
    align-items: center;
    display: flex;
    justify-content: flex-end;
`;

export const HeaderActionArea = styled.div`
    margin-left: 91px;
    position: relative;
    top: -0.5px;
    display: flex;
    align-items: center;
    ${device.medium} {
        margin-left: 50px;
    }
`;

export const ButtonBoxArea = styled.span`
    display: none;
    margin-top: 10px;
    ${device.small} {
        display: block;
    }
`;

export const MobileMenuBtn = styled.button`
    background-color: transparent;
    border: none;
    box-shadow: none;
    height: 18px;
    margin-left: 16px;
    margin-top: 0;
    position: relative;
    width: 35px;
    vertical-align: middle;
    ${device.xlarge} {
        display: none;
    }
    span {
        background-color: ${themeGet("colors.secondary")};
        border-radius: 2px;
        display: block;
        height: 3px;
        position: absolute;
        right: 0;
        transition: 0.4s;
        width: 100%;
        &:first-of-type {
            top: 0;
            width: 30px;
        }
        &:nth-of-type(2) {
            top: calc(50% - 0.3px);
            transform: translateY(-50%);
            width: 100%;
        }
        &:last-of-type {
            bottom: 0;
            width: 25px;
        }
    }
`;

export const MobileMenuArea = styled.div`
    position: fixed;
    right: -100%;
    top: 0;
    transition: 0.3s;
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    height: 100vh;
    width: 100%;
    z-index: 9999;
    &.mobile-menu-open {
        opacity: 1;
        visibility: visible;
        pointer-events: visible;
        right: 0;
        .OffCanvasContent {
            transform: none;
            opacity: 1;
            visibility: visible;
        }
    }
    .OffCanvasContent {
        background-color: rgba(0, 0, 0, 0.8);
        position: absolute;
        left: 0;
        top: 0;
        opacity: 0;
        visibility: hidden;
        transition: 0.3s;
        height: 100%;
        width: 100%;
        z-index: 2;
    }
`;

export const OffCanvasInner = styled.div`
    background-color: transparent;
    display: flex;
    justify-content: flex-end;
    position: relative;
    transform: translateX(0);
    transition: 0.3s;
    height: 100vh;
    width: 100%;
    z-index: 3;
`;

export const OffCanvasContent = styled.div`
    width: 310px;
    background-color: #fff;
    height: 100%;
    padding: 0 30px;
    position: relative;
    overflow-y: auto;
    transition: 0.4s;
    transition-duration: 0.4s;
    transform: translateX(100%);
    width: 445px;
    z-index: 9;
    transform: none;
    transition-delay: 0.4s;
`;

export const OffCanvasHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
`;
export const CloseAction = styled.div``;

export const ButtonClose = styled.button`
    box-sizing: content-box;
    background: none;
    border: none;
    color: #999999;
    font-size: 30px;
    line-height: 1;
    opacity: 1;
    background: transparent
        url(
            data:image/svg + xml,
            %3csvgxmlns="http://www.w3.org/2000/svg"viewBox="0 0 16 16"fill="%23000"%3e%3cpathd="M.293.293a1 1 0 011.414 0L8 6.586 14.293.293a1 1 0 111.414 1.414L9.414 8l6.293 6.293a1 1 0 01-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 01-1.414-1.414L6.586 8 .293 1.707a1 1 0 010-1.414z"/%3e%3c/svg%3e
        )
        center/1em auto no-repeat;
    border: 0;
`;
