import React from "react";
import { Col, Row, Container } from "react-bootstrap";
import ContactForm from "./form";
import { StaticImage } from "gatsby-plugin-image";
import {
    SectionArea,
    ContactColunm,
    ContactInfoContentArea,
    ContactInfoItem,
    ContactIcon,
    ContactInfoContent,
    ContactTitle,
} from "./style";

const ContactUs: React.FC = () => {
    return (
        <SectionArea>
            <Container fluid>
                <Row>
                    <Col lg={12}>
                        <ContactColunm>
                            <ContactForm />
                            <ContactInfoContentArea>
                                <ContactInfoItem>
                                    <ContactIcon>
                                        <StaticImage
                                            className="icon-img"
                                            src="../../../data/images/icons/c1.png"
                                            alt="Icon"
                                        />
                                    </ContactIcon>
                                    <ContactInfoContent>
                                        <ContactTitle>
                                            Số điện thoại
                                        </ContactTitle>
                                        <StaticImage
                                            className="icon-img"
                                            src="../../../data/images/shape/line-s1.png"
                                            alt="Image-Givest"
                                        />
                                        <a href="tel://+818047343979">
                                            (81) 80 4734 3979
                                        </a>
                                        <a href="tel://+818059882754">
                                            (81) 80 5988 2754
                                        </a>
                                    </ContactInfoContent>
                                </ContactInfoItem>
                                <ContactInfoItem>
                                    <ContactIcon>
                                        <StaticImage
                                            className="icon-img"
                                            src="../../../data/images/icons/c2.png"
                                            alt="Icon"
                                        />
                                    </ContactIcon>
                                    <ContactInfoContent>
                                        <ContactTitle>
                                            Địa chỉ Email
                                        </ContactTitle>
                                        <StaticImage
                                            className="icon-img"
                                            src="../../../data/images/shape/line-s1.png"
                                            alt="Image-Givest"
                                        />
                                        <a href="mailto://sbanchanxanh.jp@gmail.com">
                                            banchanxanh.jp@gmail.com
                                        </a>
                                    </ContactInfoContent>
                                </ContactInfoItem>
                            </ContactInfoContentArea>
                        </ContactColunm>
                    </Col>
                </Row>
            </Container>
        </SectionArea>
    );
};

export default ContactUs;
