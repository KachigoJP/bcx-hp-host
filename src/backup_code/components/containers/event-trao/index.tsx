import React, { useState } from "react";
import { graphql, useStaticQuery } from "gatsby";
import { Col, Row, Container } from "react-bootstrap";
import { StaticImage } from "gatsby-plugin-image";
import CheckinForm from "./checkin-form";
import Button from "@components/common/button";
import {
    SectionArea,
    InfoContentArea,
    InfoContent,
    InfoItem,
    StyledTitle,
    InfoText,
    StyledColunm,
    UnpaidText,
    FormGroup,
    Subtitle,
} from "./style";

const EventTraoArea: React.FC = () => {
    const traoQuery = useStaticQuery(graphql`
        query CabinQuery {
            allCabinJson {
                edges {
                    node {
                        cabin
                        subject
                        name
                        event_code
                    }
                }
            }
            allXeJson {
                edges {
                    node {
                        XE
                        event_code
                    }
                }
            }
        }
    `);

    const cabin = traoQuery.allCabinJson.edges as any[];
    const xe = traoQuery.allXeJson.edges as any[];

    const [data, setData] = useState<any>(null);
    const [money, setMoney] = useState<number>(0);

    const onChangeCode = (data: any) => {
        for (const item of cabin) {
            const info: any = item.node as any;

            if (data.event_code == info.event_code) {
                data.cabin = info.cabin;
                data.subject = info.subject;
            }
        }

        for (const item of xe) {
            const info: any = item.node as any;

            if (data.event_code == info.event_code) {
                data.xe = info.XE;
            }
        }

        setData(data);
        setMoney(data.ao + data.khan + data.travel_cost);

        const info = document.querySelector("#info");
        if (info) {
            info.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <SectionArea>
            <Container fluid>
                <Row>
                    <Col lg={12}>
                        <StyledColunm>
                            <CheckinForm onChangeCode={onChangeCode} />
                            <Subtitle>Thông tin đăng ký</Subtitle>
                            <InfoContentArea>
                                <InfoItem id="info">
                                    {data ? (
                                        <InfoContent>
                                            {money > 0 ? (
                                                <>
                                                    <InfoText>
                                                        TỔNG SỐ TIỀN CẦN THANH
                                                        TOÁN: {money} JPY
                                                    </InfoText>
                                                    <UnpaidText>
                                                        (Bạn vui lòng thanh toán
                                                        tại quầy checkin của Ban
                                                        Tổ Chức)
                                                    </UnpaidText>
                                                </>
                                            ) : null}

                                            <InfoText>
                                                Mã tham dự: {data.event_code}
                                            </InfoText>
                                            <InfoText>Xe: {data.xe}</InfoText>
                                            <InfoText>
                                                Họ Tên: {data.fullname}
                                            </InfoText>
                                            <InfoText>
                                                Số thành viên:{" "}
                                                {`${data.peope_num} người`}
                                            </InfoText>
                                            {data.cabin ? (
                                                <>
                                                    <InfoText>
                                                        {`${data.cabin}: ${data.subject}`}
                                                    </InfoText>
                                                </>
                                            ) : null}

                                            <InfoText>
                                                Tiền Khăn:{" "}
                                                <UnpaidText
                                                    className={
                                                        data.khan > 0
                                                            ? "unpaid"
                                                            : ""
                                                    }
                                                >
                                                    {data.khan} JPY
                                                </UnpaidText>
                                            </InfoText>
                                            <InfoText>
                                                Tiền Áo:{" "}
                                                <UnpaidText
                                                    className={
                                                        data.ao > 0
                                                            ? "unpaid"
                                                            : ""
                                                    }
                                                >
                                                    {data.ao} JPY
                                                </UnpaidText>
                                            </InfoText>
                                            <InfoText>
                                                Tiền Xe:
                                                <UnpaidText
                                                    className={
                                                        data.travel_cost > 0
                                                            ? "unpaid"
                                                            : ""
                                                    }
                                                >
                                                    {data.travel_cost} JPY
                                                </UnpaidText>
                                            </InfoText>
                                        </InfoContent>
                                    ) : null}
                                </InfoItem>
                            </InfoContentArea>
                        </StyledColunm>
                    </Col>
                </Row>
            </Container>
        </SectionArea>
    );
};

export default EventTraoArea;
