import styled from "@emotion/styled";

// Source
import { device } from "@theme";

export const SectionArea = styled.section`
    padding: 48px 0 52px;
    ${device.small} {
        padding: 48px 0 52px;
    }
    ${device.medium} {
        padding: 88px 0 92px;
    }
    ${device.large} {
        padding: 88px 0 92px;
    }
    ${device.xlarge} {
        padding: 148px 0 152px;
    }
`;
