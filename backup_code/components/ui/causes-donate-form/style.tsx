import styled from "@emotion/styled";

// Source
import { device, themeDefault as theme } from "@theme";

export const DonationFormArea = styled.div`
    padding: 55px 15px 50px;
    position: relative;
    z-index: 1;
    margin-top: 50px;
    background-color: #001d23;
    ${device.small} {
        padding: 55px 15px 50px;
    }
    ${device.large} {
        padding: 55px 15px 50px;
    }
    ${device.xlarge} {
        padding: 75px 85px 78px 86px;
    }
`;
export const SectionTitle = styled.div`
    margin-bottom: 40px;
    .line-shape {
        margin-top: 16px;
    }
`;
export const Subtitle = styled.h4`
    color: ${theme.colors.primary};
    display: inline-block;
    font-family: "Roboto", sans-serif;
    font-size: 18px;
    font-weight: 700;
    line-height: 1;
    margin: 0 0 12px;
    padding-left: 64px;
    position: relative;
    &:after {
        background-color: ${theme.colors.primary};
        content: "";
        height: 3px;
        left: 0;
        position: absolute;
        top: calc(50% - 1.5px);
        width: 43px;
    }
`;
export const Title = styled.h2`
    color: #fff;
`;

export const AmountInfo = styled.div`
    display: flex;
    margin-bottom: 40px;
    flex-direction: column;
    ${device.small} {
        flex-direction: row;
    }
`;
export const DonateAmount = styled.div`
    background-color: #001d23;
    border: 2px solid #203438;
    color: #fff;
    font-size: 18px;
    font-weight: 700;
    max-height: 58px;
    line-height: 58px;
    min-width: 95px;
    width: 100%;
    margin-right: 20px;
    padding: 0 15px;
    text-align: center;
    transition: 0.3s;
    -webkit-transition: 0.3s;
    -moz-transition: 0.3s;
    -ms-transition: 0.3s;
    -o-transition: 0.3s;
    margin-bottom: 10px;
    ${device.large} {
        max-height: 58px;
        line-height: 58px;
        max-width: 95px;
    }
    &.donate-custom-amount {
        width: 100%;
        min-width: 100px;
        margin-right: 0;
        ${device.large} {
            max-width: 180px;
            min-width: 180px;
        }
    }
    .form-control {
        background-color: #001d23;
        border: none;
        box-shadow: none;
        color: #fff;
        font-size: 18px;
        font-weight: 600;
        height: 48px;
        padding: 2px 0px;
        text-align: center;
        ${device.small} {
            height: 100%;
        }
    }
`;
export const PaymentMethodWrap = styled.div`
    margin-bottom: 38px;
`;
export const PaymentTitle = styled.h4`
    color: #fff;
    font-size: 25px;
    margin-bottom: 21px;
`;
export const PaymentMethod = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    align-items: self-start;
    ${device.small} {
        align-items: center;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
`;
export const PaymentType = styled.div`
    min-width: 223px;
    display: flex;
`;
export const FormCheckBox = styled.div`
    margin-right: 27px;
    margin-bottom: 10px;
    &::last-child {
        margin-right: 0;
    }
    .form-check-input {
        background-color: #fff;
        border: 6px solid #06323b;
        box-shadow: none;
        border-radius: 50%;
        height: 21px;
        margin-right: 12px;
        width: 21px;
        position: relative;
        &:checked[type="radio"] {
            background-image: none;
            background-color: ${theme.colors.primary};
        }
    }

    .form-check-label {
        color: #8a8d8e;
        font-size: 16px;
    }

    ${device.small} {
        margin-bottom: 0px;
    }
`;
export const PaymentPersonalInfo = styled.div`
    margin-bottom: 40px;
    .row-gutter-20 [class*="col"] {
        padding-left: 10px;
        padding-right: 10px;
    }
    .row-gutter-20 {
        margin-right: -10px;
        margin-left: -10px;
    }
`;
export const PersonalInfoTitle = styled.h4`
    color: #fff;
    font-size: 25px;
    margin-bottom: 25px;
`;

export const FormGroup = styled.div`
    margin-bottom: 20px;
    .form-control {
        background-color: #001d23;
        border: 2px solid #203438;
        border-radius: 0;
        box-shadow: none;
        color: #fff;
        font-size: 18px;
        font-weight: 400;
        height: 55px;
        padding: 15px 20px;
        &.textarea {
            min-height: 140px;
        }
    }
`;

export const ButtonWrap = styled.div`
    display: flex;
`;
export const LayerStyle = styled.div`
    .layer-style1 {
        left: 0;
        pointer-events: none;
        position: absolute !important;
        top: 0;
        z-index: -1;
    }
    .layer-style2 {
        bottom: 0;
        pointer-events: none;
        position: absolute !important;
        right: 0;
        z-index: -1;
    }
`;
