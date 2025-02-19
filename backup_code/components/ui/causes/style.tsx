import { themeGet } from "@styled-system/theme-get";
import styled from "@emotion/styled";

// Source
import { device, themeDefault as theme } from "@theme";

export const CausesItemWrap = styled.div`
    margin-bottom: 30px;
`;
export const Thumb = styled.div`
    overflow: hidden;
    display: flex;
    img {
        width: 100%;
        transition: 0.8s;
        -webkit-transition: 0.8s;
        -moz-transition: 0.8s;
        -ms-transition: 0.8s;
        -o-transition: 0.8s;
    }
`;
export const ContentBox = styled.div`
    background-color: #f7f7f7;
    padding: 31px 20px 10px;
    ${device.small} {
        padding: 31px 10px 10px;
    }
    ${device.medium} {
        padding: 31px 20px 10px;
    }
    ${device.large} {
        padding: 31px 10px 10px;
    }
    ${device.xlarge} {
        padding: 31px 25px 10px;
    }
`;
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
        min-width: 90px;
        padding: 7px 13px 6px;
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
export const Title = styled.h5`
    line-height: 1.455;
    margin-bottom: 8px;
`;

export const CausesFooter = styled.div`
    align-items: center;
    background-color: #f7f7f7;
    display: flex;
    justify-content: space-between;
    padding: 15px 15px 33px;
    ${device.small} {
        padding: 15px 10px 33px;
    }
    ${device.medium} {
        padding: 15px 20px 33px;
    }
    ${device.large} {
        padding: 15px 10px 33px;
    }
    ${device.xlarge} {
        padding: 15px 25px 33px;
    }
`;

export const UserAdmin = styled.div``;

export const UserAdminTitle = styled.h5`
    font-family: ${themeGet("fonts.body")};
    font-size: 15px;
    font-weight: 700;
    margin-bottom: 0;
    a {
        display: flex;
        align-items: center;
    }
`;

export const UserAdminImg = styled.div`
    box-shadow: 0px 3px 7px 0px rgb(252 102 57 / 8%);
    height: 40px;
    line-height: 45px;
    text-align: center;
    display: block;
    border-radius: 50%;
    background-color: #fff;
    min-width: 40px;
    margin-right: 11px;
    width: 40px;
`;
