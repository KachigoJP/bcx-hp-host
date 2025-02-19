import { themeGet } from "@styled-system/theme-get";
import styled from "@emotion/styled";

// Source
import { device, themeDefault as theme } from "@theme";

export const SectionArea = styled.section`
    padding: 78px 0 157px;
    ${device.large} {
        padding: 98px 0 187px;
    }
    ${device.xlarge} {
        padding: 145px 0 120px;
    }
`;
export const EventContentWrap = styled.div`
    padding-right: 0px;
    ${device.large} {
        padding-right: 40px;
    }
    ${device.medium} {
        padding-right: 40px;
    }
    ${device.xlarge} {
        padding-right: 170px;
    }
`;

export const LayerStyle = styled.div`
    position: relative;
    margin-top: 150px;
    ${device.small} {
    }
    ${device.large} {
        margin-top: 290px;
    }
    ${device.xlarge} {
        width: auto;
        margin-top: 150px;
    }
    ${device.xxlarge} {
        width: 640px;
    }

    @media only screen and (min-width: 1400px) and (max-width: 1499px) {
        left: -40px;
        margin-top: 290px;
        width: 460px;
    }

    .shape-style1,
    .shape-style2,
    .shape-style3,
    .shape-style4 {
        position: absolute;
        z-index: -1;
        img {
            max-width: none;
        }
    }
    .shape-style1 {
        left: 40px;
        top: -122px;
    }
    .shape-style2 {
        left: -59px;
        top: 0;
    }
    .shape-style3 {
        left: 21px;
        top: -136px;
    }
    .shape-style4 {
        left: -34px;
        top: 4px;
    }
`;

export const Thumb = styled.div`
    position: relative;
    img {
        max-width: none;
    }
    .play-video-btn {
        left: 50%;
        position: absolute;
        top: 40.5%;
        transform: translateX(-50%);
        .icon {
            border-radius: 50%;
            display: inline-block;
            height: 100px;
            line-height: 100px;
            position: relative;
            text-align: center;
            width: 100px;
            z-index: 1;
            background: ${themeGet("colors.secondary")};
            background: ${theme.colors.gradient};
        }
        .wave-btn {
            cursor: pointer;
        }
        .wave-btn span {
            background: #f6dec9;
            border-radius: 50%;
            height: 200px;
            left: -50px;
            position: absolute;
            top: -50px;
            width: 200px;

            &:nth-of-type(1) {
                background: ${themeGet("colors.secondary")};
                animation: wave-button 2s infinite 0.1s linear backwards;
            }
            &:nth-of-type(2) {
                background: ${themeGet("colors.secondary")};
                animation: wave-button 3s infinite 0.5s linear backwards;
            }
            &:nth-of-type(3) {
                animation: wave-button 4s infinite 1s linear backwards;
                background: ${themeGet("colors.secondary")};
                background: ${theme.colors.gradient};
            }
        }

        @keyframes wave-button {
            0% {
                opacity: 1;
                transform: scale(0.3);
            }
            50% {
                opacity: 0.5;
                transform: scale(0.6);
            }
            100% {
                opacity: 0;
                transform: scale(1);
            }
        }
    }
`;
