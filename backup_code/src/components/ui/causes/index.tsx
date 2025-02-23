import React from "react";
import { Link } from "gatsby";
import { useTranslation } from "react-i18next";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

// SOurce
import { themeGet } from "@styled-system/theme-get";
import Button from "@components/common/button";
import {
    CausesItemWrap,
    Thumb,
    ContentBox,
    DonateInfo,
    InfoItem,
    Title,
    UserAdmin,
    UserAdminTitle,
    CausesFooter,
    UserAdminImg,
    InfoItemTitle,
    Amount,
} from "./style";
import { CauseItemProps } from "./interface";

const CausesItem: React.FC<CauseItemProps> = ({
    title,
    dec,
    adminName,
    image,
    donateInfo,
    adminImage,
    slug,
}) => {
    const { t } = useTranslation();
    const Thumbimage = getImage(image);
    const adminImg = getImage(adminImage);
    const donateInfoData = donateInfo;

    return (
        <CausesItemWrap>
            {Thumbimage ? (
                <Thumb>
                    <GatsbyImage image={Thumbimage} alt={title} />
                </Thumb>
            ) : null}

            <ContentBox>
                {/* <DonateInfo>
                    {donateInfoData.map((infoData, i) => {
                        return (
                            <InfoItem key={`donate-${i}`}>
                                <InfoItemTitle>
                                    {infoData.donateTitle}
                                </InfoItemTitle>
                                <Amount>{infoData.amount}</Amount>
                            </InfoItem>
                        );
                    })}
                </DonateInfo> */}
                <Title>
                    <Link to={`/causes/${slug}`}>{title}</Link>
                </Title>
                <p>{dec}</p>
            </ContentBox>
            <CausesFooter>
                {adminImg ? (
                    <UserAdmin>
                        <UserAdminTitle>
                            <Link to={`/causes/${slug}`}>
                                <UserAdminImg>
                                    <GatsbyImage image={adminImg} alt="Icon" />
                                </UserAdminImg>
                                {adminName}
                            </Link>
                        </UserAdminTitle>
                    </UserAdmin>
                ) : null}

                {/* <Button
                    path={`/causes/${slug}`}
                    size="small"
                    variant="outlined"
                    color="light"
                    sx={{
                        color: themeGet("colors.primary"),
                        fontWeight: "400",
                    }}
                >
                    {t("Donate Now")}
                    <i
                        sx={{ ml: "8px", fontSize: "12px !important" }}
                        className="flaticon-right-arrow"
                    ></i>
                </Button> */}
            </CausesFooter>
        </CausesItemWrap>
    );
};

export default CausesItem;
