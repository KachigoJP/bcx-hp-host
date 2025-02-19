import React from "react";
import { Col, Row } from "react-bootstrap";
import { StaticImage } from "gatsby-plugin-image";
import { useTranslation } from "react-i18next";

// Source
import Button from "@components/common/button";
import {
    DonationFormArea,
    SectionTitle,
    Subtitle,
    Title,
    AmountInfo,
    DonateAmount,
    PaymentMethodWrap,
    PaymentTitle,
    PaymentMethod,
    PaymentType,
    FormCheckBox,
    PaymentPersonalInfo,
    PersonalInfoTitle,
    FormGroup,
    ButtonWrap,
    LayerStyle,
} from "./style";

const CausesDonateForm: React.FC = () => {
    const { t } = useTranslation();
    return (
        <DonationFormArea>
            <SectionTitle>
                <Subtitle>
                    Chung tay cùng chúng tôi tùy theo sức của bạn
                </Subtitle>
                <Title>{t("Donate Now")}</Title>
                <StaticImage
                    className="line-shape"
                    src="../../data/images/shape/line-t3.png"
                    alt="Image-Givest"
                />
            </SectionTitle>
            <form action="#">
                {/* <AmountInfo>
                    <DonateAmount>2000¥</DonateAmount>
                    <DonateAmount>5000¥</DonateAmount>
                    <DonateAmount>10000¥</DonateAmount>
                    <DonateAmount className="donate-custom-amount">
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Custom"
                        />
                    </DonateAmount>
                </AmountInfo> */}
                <PaymentMethodWrap>
                    <PaymentTitle>Cách thức ủng hộ:</PaymentTitle>
                    <PaymentMethod>
                        <PaymentType>
                            <FormCheckBox>
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="inlineRadioOptions"
                                    id="inlineRadio1"
                                    value="option1"
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="inlineRadio1"
                                >
                                    Ủng hộ tiền mặt khi tham gia leo núi
                                </label>
                            </FormCheckBox>
                            <FormCheckBox>
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="inlineRadioOptions"
                                    id="inlineRadio1"
                                    value="option1"
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="inlineRadio1"
                                >
                                    Chuyển khoản
                                </label>
                            </FormCheckBox>
                            <FormCheckBox>
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="inlineRadioOptions"
                                    id="inlineRadio2"
                                    value="option2"
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="inlineRadio2"
                                >
                                    Mua khăn rằn
                                </label>
                            </FormCheckBox>
                        </PaymentType>
                        {/* <StaticImage
                            src="../../data/images/photos/payment-card.png"
                            alt="Image-Givest"
                        /> */}
                    </PaymentMethod>
                </PaymentMethodWrap>
                <PaymentPersonalInfo>
                    <PersonalInfoTitle>
                        Tài khoản nhận ủng hộ:
                    </PersonalInfoTitle>
                    <Row className="row-gutter-20">
                        <Col md={12}>
                            <p>
                                <b>Ngân hàng:</b> SMBC (三井住友銀行)
                            </p>
                            <p>
                                <b>Chi nhánh:</b> 672 ときわ台店
                            </p>
                            <p>
                                <b>Số tài khoản:</b> 7230273
                            </p>
                            <p>
                                <b>Tên tài khoản:</b> ﾊﾞﾝ　ﾁｬﾝ　ｻﾝ
                            </p>
                        </Col>
                        {/* <Col md={6}>
                            <FormGroup htmlFor="blogs_name">
                                <input
                                    className="form-control"
                                    type="text"
                                    name="con_name"
                                    placeholder="Name"
                                />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup htmlFor="blogs_name">
                                <input
                                    className="form-control"
                                    type="email"
                                    name="con_email"
                                    placeholder="Email"
                                />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup htmlFor="blogs_name">
                                <input
                                    className="form-control"
                                    type="text"
                                    name="con_phone"
                                    placeholder="Phone"
                                />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup htmlFor="blogs_name">
                                <input
                                    className="form-control"
                                    type="text"
                                    name="con_address"
                                    placeholder="Address"
                                />
                            </FormGroup>
                        </Col>
                        <Col md={12}>
                            <FormGroup>
                                <textarea
                                    className="form-control textarea"
                                    name="con_message"
                                    placeholder="Message"
                                ></textarea>
                            </FormGroup>
                        </Col>*/}
                    </Row>
                </PaymentPersonalInfo>
                {/* <ButtonWrap>
                    <Button path="#/" color="gradient">
                        {t("Donate Now")}
                        <StaticImage
                            className="icon icon-img"
                            src="../../data/images/icons/arrow-line-right2.png"
                            alt="Icon"
                        />
                    </Button>
                    <Button
                        path="#/"
                        color="border-normal"
                        sx={{
                            color: "#fff",
                            ml: "5px",
                            border: "2px solid #ddd",
                        }}
                    >
                        Total Donation: $50
                    </Button>
                </ButtonWrap> */}
            </form>
            <LayerStyle>
                <StaticImage
                    className="layer-style1"
                    src="../../data/images/shape/form-shape1.png"
                    alt="Image-Givest"
                />
                <StaticImage
                    className="layer-style2"
                    src="../../data/images/shape/form-shape2.png"
                    alt="Image-Givest"
                />
            </LayerStyle>
        </DonationFormArea>
    );
};

export default CausesDonateForm;
