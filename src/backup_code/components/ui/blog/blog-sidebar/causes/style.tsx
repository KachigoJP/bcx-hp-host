import { themeGet } from "@styled-system/theme-get";
import styled from "@emotion/styled";

// Source
import { device, themeDefault as theme } from "@theme";

export const WidgetCausesItem = styled.div`
    margin-bottom: -10px;
    padding-top: 10px;
`;
export const Thumb = styled.div`
    overflow: hidden;
`;
export const CauseContentBox = styled.div`
    background-color: #f7f7f7;
    padding: 20px 0 0;
`;

export const Title = styled.h5``;

export const DonateInfo = styled.ul`
    display: flex;
    justify-content: space-between;
    margin-bottom: 26px;
`;
export const InfoItem = styled.li`
    background-color: #fff;
    font-family: ${themeGet("fonts.heading")};
    min-width: 75px;
    min-width: 90px;
    padding: 7px 13px 6px;
    -webkit-transition: 0.3s;
    -moz-transition: 0.3s;
    -ms-transition: 0.3s;
    -o-transition: 0.3s;
    ${device.small} {
        min-width: 80px;
        padding: 7px 5px 6px;
    }
    ${device.medium} {
        min-width: 100px;
        padding: 7px 20px 6px 32px;
    }
`;
export const InfoItemTitle = styled.span`
    color: #001d23;
    font-size: 14px;
    margin-bottom: 8px;
    display: block;
    line-height: 1;
`;
export const Amount = styled.span`
    color: ${theme.colors.primary};
    font-size: 16px;
    background: ${themeGet("colors.secondary")};
    background: ${themeGet("colors.gradient")};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    display: block;
    line-height: 1;
    ${device.xlarge} {
        font-size: 20px;
    }
`;

export const ProgressItem = styled.div`
    margin-bottom: 42px;
    .progress {
        .progress-bar {
            position: relative;
            color: #fff;
            text-align: center;
            white-space: nowrap;
            border-radius: 0;
            background: ${themeGet("colors.secondary")};
            background: ${theme.colors.gradient};
            &::after {
                background-color: ${theme.colors.primary};
                border-radius: 50%;
                content: "";
                height: 12px;
                position: absolute;
                right: -3px;
                top: 50%;
                width: 12px;
                transform: translate(0px, -50%);
                -webkit-transform: translate(0px, -50%);
                -moz-transform: translate(0px, -50%);
                -ms-transform: translate(0px, -50%);
                -o-transform: translate(0px, -50%);
            }
        }
    }
`;
export const AmountInfo = styled.div`
    margin-bottom: 30px;
`;
export const DonateAmount = styled.div`
    border: 1px solid #dadada;
    color: #001d23;
    display: inline-block;
    font-size: 15px;
    font-weight: 700;
    height: 40px;
    line-height: 40px;
    margin-bottom: 13px;
    margin-right: 11px;
    min-width: 60px;
    text-align: center;
    &.mr-0 {
        margin-right: 0;
    }
    &.donate-custom-amount {
        display: block;
        font-size: 15px;
        height: 45px;
        text-align: left;
        width: 100%;
        .form-control {
            background-color: transparent;
            border: none;
            box-shadow: none;
            color: #001d23;
            font-weight: 400;
            height: 100%;
            display: block;
            width: 100%;
            padding: 0.375rem 0.75rem;
            font-size: 15px;
            appearance: none;
            border-radius: 0.25rem;
            transition: border-color 0.15s ease-in-out,
                box-shadow 0.15s ease-in-out;
        }
    }
`;
