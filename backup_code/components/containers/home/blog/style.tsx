import styled from "@emotion/styled";

// Source
import { device } from "@theme";

export const SectionArea = styled.section`
    padding: 48px 0 2px;
    ${device.small} {
        padding: 48px 0 0px;
    }
    ${device.medium} {
        padding: 88px 0 92px;
    }
    ${device.large} {
        padding: 88px 0 92px;
    }
    ${device.xlarge} {
        padding: 145px 0 120px;
    }
`;
