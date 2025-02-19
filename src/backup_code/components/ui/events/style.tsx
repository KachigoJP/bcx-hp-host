import { themeGet } from "@styled-system/theme-get";
import styled from "@emotion/styled";

// Source
import { device } from "@theme";

export const EventItemWrap = styled.div`
    display: block;
    margin-bottom: 30px;
    ${device.small} {
        display: flex;
        height: 100%;
    }
`;
export const Thumb = styled.div`
    .gatsby-image-wrapper-constrained {
        display: block !important;
    }

    overflow: hidden;
    position: relative;
    ${device.small} {
        min-width: 240px;
    }
    img {
        height: 100% !important;
        width: 100% !important;
        display: block !important;
    }
    & .btn-theme {
        left: 50%;
        opacity: 0;
        position: absolute;
        top: 50%;
        visibility: hidden;
        transform: translate(-50%, -50%);
        -webkit-transform: translate(-50%, -50%);
        -moz-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        -o-transform: translate(-50%, -50%);
        transition: 0.3s;
        -webkit-transition: 0.3s;
        -moz-transition: 0.3s;
        -ms-transition: 0.3s;
        -o-transition: 0.3s;
    }
    &:hover {
        & .btn-theme {
            opacity: 1;
            visibility: visible;
        }
    }
`;

export const ContentArea = styled.div`
    padding: 25px 30px 15px;
    background-color: #f7f7f7;
`;

export const EventInfo = styled.div`
    color: #001d23;
    font-weight: 700;
    margin-bottom: 8px;
    font-size: 14px;
    span {
        color: ${themeGet("colors.primary")};
    }
`;

export const EventName = styled.h5``;
