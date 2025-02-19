import styled from "@emotion/styled";

// Source
import { device } from "@theme";

export const SidebarArea = styled.div`
    margin-top: 50px;
    ${device.large} {
        margin-top: 0;
    }
`;

export const Widget = styled.div`
    background-color: #f7f7f7;
    padding: 35px 15px 33px;
    margin-bottom: 60px;
    ${device.small} {
        padding: 47px 48.5px 50px;
    }
    ${device.medium} {
        padding: 47px 48.5px 50px;
    }
    ${device.large} {
        padding: 35px 15px 33px;
    }
    ${device.xlarge} {
        padding: 47px 48.5px 50px;
    }
`;

export const WidgetTitle = styled.h3`
    font-size: 20px;
    margin-bottom: 12px;
    ${device.medium} {
        font-size: 28px;
        margin-bottom: 18px;
    }
`;
export const SeparatorLine = styled.div`
    margin-bottom: 27px;
`;
