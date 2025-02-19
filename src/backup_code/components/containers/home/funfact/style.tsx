import styled from "@emotion/styled";

// Source
import { device } from "@theme";

export const SectionArea = styled.section`
    .container {
        max-width: 1310px;
    }
    background-color: #f7f7f7;
    .funfact-item {
        border-bottom: 1px solid #eaecec;
        padding: 60px 0 63px;
        transition: 0.3s;
        -webkit-transition: 0.3s;
        -moz-transition: 0.3s;
        -ms-transition: 0.3s;
        -o-transition: 0.3s;
        &:last-child {
            border-right: 1px solid #eaecec;
        }
        ${device.small} {
            border-left: 1px solid #eaecec;
        }
        ${device.medium} {
            padding: 90px 0 93px;
            border-left: 1px solid #eaecec;
            border-bottom: none;
        }
        ${device.xlarge} {
            padding: 140px 0 143px;
            border-left: 1px solid #eaecec;
            border-bottom: none;
        }
    }
`;

export const FunFactItefffm = styled.div``;
