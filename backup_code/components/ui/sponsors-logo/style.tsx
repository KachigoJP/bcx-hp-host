import styled from "@emotion/styled";

export const BrandLogoItem = styled.div`
    align-items: center;
    display: flex;
    justify-content: center;
    margin-bottom: 49px;
    min-height: 79px;
    text-align: center;
    cursor: pointer;
    img {
        opacity: 1 !important;
        transition: 0.3s;
    }
    &:hover {
        img {
            opacity: 0.7 !important;
        }
    }
`;
