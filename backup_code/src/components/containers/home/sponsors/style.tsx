import styled from "@emotion/styled";

// Source
import { device } from "@theme";

export const SectionArea = styled.section`
    padding: 60px 15px 267px;
    ${device.medium} {
        padding: 38px 0 292px;
    }
    ${device.large} {
        padding: 88px 0 292px;
    }
    ${device.xlarge} {
        padding: 109px 0 339px;
    }
`;
export const BrandLogoContent = styled.div`
    margin: 16px -27px 0;
`;
