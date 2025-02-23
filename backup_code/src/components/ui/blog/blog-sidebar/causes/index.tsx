import React from "react";
import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import { ProgressBar } from "react-bootstrap";
import { useTranslation } from "react-i18next";

// Source
import Button from "@components/common/button";
import {
    WidgetCausesItem,
    Thumb,
    CauseContentBox,
    DonateInfo,
    InfoItem,
    InfoItemTitle,
    Amount,
    Title,
    ProgressItem,
    AmountInfo,
    DonateAmount,
} from "./style";

const UrgentCauses: React.FC = () => {
    const { t } = useTranslation();
    return (
        <WidgetCausesItem>
            <Thumb>
                <StaticImage
                    src="../../../../data/images/causes/w1.jpg"
                    alt="Givest-HasTech"
                />
            </Thumb>
            <CauseContentBox>
                <Title>
                    <Link to="#!">Need School For Uganda Poor Children.</Link>
                </Title>
                <DonateInfo>
                    <InfoItem>
                        <InfoItemTitle>Goal:</InfoItemTitle>
                        <Amount>$ 5,000</Amount>
                    </InfoItem>
                    <InfoItem className="info-item">
                        <InfoItemTitle>Raised:</InfoItemTitle>
                        <Amount>$ 2,000</Amount>
                    </InfoItem>
                </DonateInfo>
                <ProgressItem>
                    <ProgressBar
                        className="gradient"
                        now={70}
                        label={`70%`}
                    ></ProgressBar>
                </ProgressItem>
                <form action="#">
                    <AmountInfo>
                        <DonateAmount>$20</DonateAmount>
                        <DonateAmount>$35</DonateAmount>
                        <DonateAmount>$48</DonateAmount>
                        <DonateAmount className="mr-0">$90</DonateAmount>
                        <DonateAmount className="donate-custom-amount">
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Custome Amount"
                            />
                        </DonateAmount>
                    </AmountInfo>
                    <Button color="gradient" path="#">
                        <span>{t("Donate Now")}</span>
                    </Button>
                </form>
            </CauseContentBox>
        </WidgetCausesItem>
    );
};

export default UrgentCauses;
