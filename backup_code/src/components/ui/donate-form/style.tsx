import styled from "@emotion/styled";

// Source
import { device, themeDefault as theme } from "@theme";

export const DonateFormArea = styled.div`
    position: relative;
    z-index: 0;
    &::before {
        background-color: #08242a;
        border-radius: 50%;
        content: "";
        height: 724px;
        left: -512px;
        position: absolute;
        top: -236px;
        width: 624px;
        z-index: -1;
        ${device.small} {
            width: 724px;
        }
    }
`;
export const DonateAmountInfo = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 50px;
    ${device.small} {
        flex-direction: row;
    }
`;
export const DonateAmount = styled.div`
    border: 2px solid #203438;
    color: #fff;
    font-size: 18px;
    font-weight: 700;
    height: 58px;
    line-height: 58px;
    margin-right: 0px;
    margin-bottom: 10px;
    min-width: 95px;
    text-align: center;
    transition: 0.3s;
    -webkit-transition: 0.3s;
    -moz-transition: 0.3s;
    -ms-transition: 0.3s;
    -o-transition: 0.3s;
    ${device.small} {
        margin-right: 20px;
        margin-bottom: 0px;
    }
    &.donate-custom-amount {
        max-width: 180px;
        min-width: 100%;
        margin-right: 0;
        &:hover {
            border: 2px solid ${theme.colors.primary};
            cursor: pointer;
        }
        ${device.small} {
            max-width: 180px;
            min-width: 180px;
        }
    }
    & .form-control {
        background-color: transparent;
        border: none;
        box-shadow: none;
        color: #fff;
        font-size: 18px;
        font-weight: 600;
        height: 58px;
        padding: 2px 0px;
        text-align: center;
    }
    .form-control::-webkit-input-placeholder {
        /* Chrome/Opera/Safari */
        color: #fff;
        font-size: 18px;
        font-weight: 700;
    }
    .form-control::-moz-placeholder {
        /* Firefox 19+ */
        color: #fff;
        font-size: 18px;
        font-weight: 700;
    }
    .form-control:-ms-input-placeholder {
        /* IE 10+ */
        color: #fff;
        font-size: 18px;
        font-weight: 700;
    }
    .form-control:-moz-placeholder {
        /* Firefox 18- */
        color: #fff;
        font-size: 18px;
        font-weight: 700;
    }
`;
