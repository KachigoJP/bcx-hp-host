import { themeGet } from "@styled-system/theme-get";
import styled from "@emotion/styled";

// Source
import { device, themeDefault as theme } from "@theme";

export const EventDetailsArea = styled.section`
    padding: 70px 0 280px;
    ${device.medium} {
        padding: 100px 0 300px;
    }
    ${device.large} {
        padding: 120px 0 300px;
    }
    ${device.xlarge} {
        padding: 150px 0 390px;
    }
`;
export const EventDetailsContentArea = styled.div`
    ${device.large} {
        margin-right: 50px;
    }
`;
export const EventDetails = styled.div``;
export const Thumb = styled.div`
    margin-bottom: 10px;
`;
export const EventTimeInfo = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    ${device.small} {
        flex-direction: row;
    }
`;
export const InfoItem = styled.div`
    background-color: #f7f7f7;
    border-radius: 15px;
    display: inline-block;
    height: 150px;
    min-width: 100%;
    padding: 40px 15px 55px;
    text-align: center;
    width: 200px;
    transition: 0.2s;
    -webkit-transition: 0.2s;
    -moz-transition: 0.2s;
    -ms-transition: 0.2s;
    -o-transition: 0.2s;
    margin-top: 20px;
    ${device.small} {
        height: 170px;
        min-width: 170px;
        width: 150px;
        border-radius: 50px;
    }
    ${device.medium} {
        height: 200px;
        min-width: 200px;
    }
    ${device.large} {
        height: 170px;
        min-width: 170px;
        width: 150px;
        border-radius: 50px;
    }
    ${device.xlarge} {
        height: 200px;
        min-width: 220px;
        border-radius: 75px;
    }
`;
export const EventItemIcon = styled.div`
    margin-bottom: 12px;
`;

export const EventItemTitle = styled.h6`
    font-size: 16px;
    margin-bottom: 0;
    background: ${themeGet("colors.secondary")};
    background: ${theme.colors.gradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    transition: 0.1s;
    -webkit-transition: 0.1s;
    -moz-transition: 0.1s;
    -ms-transition: 0.1s;
    -o-transition: 0.1s;
    ${device.xlarge} {
        font-size: 22px;
    }
`;
export const EventCategoryPost = styled.div`
    display: flex;
    margin-top: 40px;
    flex-direction: column;

    ${device.small} {
        flex-direction: row;
        align-items: center;
    }
`;
export const EventCategory = styled.div`
    background-color: ${theme.colors.primary};
    color: #fff;
    display: inline-block;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 1.2px;
    line-height: 1;
    min-width: 105px;
    text-align: center;
    padding: 7.5px 3px;
    text-transform: uppercase;
    margin-bottom: 10px;
    ${device.small} {
        margin-right: 30px;
        margin-bottom: 0px;
    }
`;
export const EventAuthor = styled.div``;
export const EventTitle = styled.h3`
    margin-bottom: 18px;
    margin-top: 32px;
`;
export const DetailsText = styled.p``;
export const InnerTitle = styled.h5`
    margin-top: 20px;
`;

export const ButtonWrap = styled.div`
    display: flex;
    margin-top: 30px;
`;

export const MapContent = styled.div`
    margin-top: 30px;
    margin-bottom: 20px;
    iframe {
        height: 400px;
        width: 100%;
    }
`;
