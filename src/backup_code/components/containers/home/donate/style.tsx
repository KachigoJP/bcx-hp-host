import { themeGet } from "@styled-system/theme-get";
import styled from "@emotion/styled";

// Source
import { device } from "@theme";
import DonateImage from "@data/images/photos/bg-donate1.jpg";

export const SectionArea = styled.section`
    overflow: hidden;
    padding: 80px 0;
    background-color: #001d23 !important;
    ${device.large} {
        padding: 100px 0;
    }
    ${device.xlarge} {
        padding: 105px 0 104px;
    }
`;
export const TdonnersConten = styled.div`
    .thumb-bg-layer {
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
        background: url(${DonateImage});
        margin-top: 70px;
        min-height: 300px;
        position: relative;
        width: auto;
        margin-top: 0;
        ${device.medium} {
            min-height: 320px;
        }
        ${device.large} {
            min-height: 236px;
            position: absolute;
            right: 0;
            width: calc(50% - 100px);
        }
        ${device.xlarge} {
            min-height: 286px;
            position: absolute;
            right: 0;
            width: calc(50% - 120px);
        }
        ${device.xxlarge} {
            min-height: 330px;
            position: absolute;
            right: 0;
            width: calc(50% - 215px);
        }
    }
`;
export const DonnersInfo = styled.div`
    padding-top: 30px;
    ${device.large} {
        padding-top: 280px;
    }
    ${device.xlarge} {
        padding-top: 320px;
    }
    ${device.xxlarge} {
        padding-top: 380px;
    }
    h3 {
        color: #fff;
        font-size: 40px;
        margin-bottom: 22px;
    }
    p {
        color: #fff;
        margin-bottom: 32px;
        ${device.large} {
            margin-right: -100px;
        }
    }
`;

export const DonnersItems = styled.div`
    display: flex;
`;
export const DonnerIem = styled.div`
    background-color: #13373e;
    border-radius: 50%;
    height: 62px;
    margin-right: 16px;
    padding: 4px;
    width: 62px;
    ${device.xlarge} {
        height: 76px;
        width: 76px;
        line-height: 74px;
        font-size: 20px;
    }
`;
export const DonnerNumber = styled.div`
    border-radius: 50%;
    height: 60px;
    width: 60px;
    line-height: 64px;
    padding: 4px;
    color: #fff;
    font-size: 14px;
    font-family: ${themeGet("fonts.heading")};
    text-align: center;
    background: ${themeGet("colors.secondary")};
    background: ${themeGet("colors.gradient")};
    ${device.xlarge} {
        height: 76px;
        width: 76px;
        line-height: 74px;
        font-size: 20px;
    }
`;
