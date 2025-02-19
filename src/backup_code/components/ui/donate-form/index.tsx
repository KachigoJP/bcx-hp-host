import React from "react";
import { useTranslation } from "react-i18next";

// Source
import Button from "@components/common/button";
import { DonateFormArea, DonateAmountInfo, DonateAmount } from "./style";

const DonateForm: React.FC = () => {
    const { t } = useTranslation();
    return (
        <DonateFormArea>
            <form action="#">
                <DonateAmountInfo>
                    <DonateAmount>$20</DonateAmount>
                    <DonateAmount>$50</DonateAmount>
                    <DonateAmount>$200</DonateAmount>
                    <DonateAmount className="donate-custom-amount">
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Custom"
                        />
                    </DonateAmount>
                </DonateAmountInfo>
                <div className="btn-wrp" css={{ display: "flex", mb: "30px" }}>
                    <Button path="#!" color="gradient" css={{ color: "#fff" }}>
                        {t("Donate Now")}{" "}
                        <i className="flaticon-right-arrow"></i>
                    </Button>
                    <Button
                        path="#!"
                        variant="outlined"
                        css={{ ml: "10px", color: "#fff" }}
                    >
                        Join Events <i className="flaticon-right-arrow"></i>
                    </Button>
                </div>
            </form>
        </DonateFormArea>
    );
};

export default DonateForm;
