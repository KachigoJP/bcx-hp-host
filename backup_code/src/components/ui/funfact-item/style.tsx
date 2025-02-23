import styled from "@emotion/styled";

import { device } from "@theme";

export const FunInnerContent = styled.div`
    display: flex;
    justify-content: center;
`;

export const IconBox = styled.div`
    margin: 39px 44px 0 0;
    position: relative;
    width: 45px;
    height: 40px;
    .icon {
        width: 45px;
    }
    .shape-img {
        left: -38px;
        width: 85px;
        position: absolute !important;
        top: -48px;
    }
    ${device.large} {
        .icon {
            max-width: none;
            min-width: 66px;
        }
        .shape-img {
            max-width: none;
        }
    }
    ${device.medium} {
        margin: 39px 25px 0 0;
    }
    ${device.xxlarge} {
        width: auto;
        height: auto;
        .icon {
            max-width: none;
            min-width: 66px;
        }
        .shape-img {
            left: -38px;
            max-width: none;
            position: absolute;
            top: -48px;
            width: auto;
        }
    }
`;

export const FunFactContent = styled.div``;
export const NumberOfFunArea = styled.div``;

export const Title = styled.p`
    font-size: 22px;
`;
