import React, { useState } from "react";
import { graphql, useStaticQuery } from "gatsby";
import { Col, Row } from "react-bootstrap";
import Button from "@components/common/button";
import {
    FormArea,
    Form,
    SectionTitle,
    Subtitle,
    Title,
    SectionDec,
    FormGroup,
    Input,
    ErrorText,
    Description,
} from "./style";
import { CheckinForm } from "./interface";

const ComponentForm: React.FC<CheckinForm> = (props) => {
    const traoQuery = useStaticQuery(graphql`
        query TraoQuery {
            allTraoJson {
                edges {
                    node {
                        email
                        fullname
                        katakana
                        phone_number
                        event_code
                        peope_num
                        khan
                        ao
                        travel_cost
                    }
                }
            }
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
        }
    `);

    const data = traoQuery.allTraoJson.edges as any[];

    const [errMess, setErrMess] = useState("");
    const onSubmit = (event: any) => {
        event.preventDefault();
        const searchText = event.target.search.value;

        for (const item of data) {
            const info: any = item.node as any;

            if (searchText === info.email) {
                props.onChangeCode(info);
                return;
            }

            if (searchText === info.event_code) {
                props.onChangeCode(info);
                return;
            }

            const phoneNumber = info.phone_number
                .replace(" ", "")
                .replace("-", "");
            if (searchText === phoneNumber) {
                props.onChangeCode(info);
                return;
            }

            const name = info.fullname
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "");

            const searchName = searchText
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "");

            if (searchName.toLowerCase() === name.toLowerCase()) {
                props.onChangeCode(info);
                return;
            }
        }

        setErrMess(
            "Không tìm thấy thông tin. Bạn Bạn vui lòng kiểm tra đã nhập đúng thông tin đã đăng ký chưa!"
        );
    };

    const onChangeSearch = (event: any) => {
        setErrMess("");
    };
    return (
        <FormArea>
            <Row>
                <Col lg={12}>
                    <SectionTitle>
                        <SectionDec>Chào Mừng Đến Với Sự Kiện</SectionDec>
                        <Subtitle>TRAO 2 2024/08/03</Subtitle>
                        <SectionDec>
                            Cảm ơn các bạn đã tham gia sự kiện hôm nay cùng
                            chúng mình
                        </SectionDec>
                    </SectionTitle>
                </Col>
            </Row>
            <Row>
                <Col lg={12}>
                    <Form onSubmit={onSubmit} method="post">
                        <Row className="row-gutter-20">
                            <Col lg={12}>
                                <Row>
                                    <FormGroup>
                                        <SectionDec>
                                            Bạn hãy nhập thông tin đã đăng ký
                                            vào ô sau và nhấn tìm kiếm
                                        </SectionDec>
                                        <Input
                                            name="search"
                                            placeholder="Họ tên, SĐT, Email, Mã tham gia..."
                                            onChange={onChangeSearch}
                                            required
                                        />
                                        <ErrorText>{errMess}</ErrorText>
                                        <Description>
                                            (Thông tin có thể nhập bao gồm)
                                        </Description>
                                        <Description>
                                            Đầy đủ họ và tên. VD: kieu quoc
                                            chien
                                        </Description>
                                        <Description>
                                            Số điện thoại. VD: 08024221232
                                        </Description>
                                        <Description>
                                            Email. VD: kieuquocchien@gmail.com
                                        </Description>
                                        <Description>
                                            Mã tham gia. VD:BCX-123456
                                        </Description>
                                    </FormGroup>
                                </Row>
                            </Col>
                            <Col lg={12}>
                                <FormGroup>
                                    <Button type="submit" color="gradient">
                                        Tìm kiếm
                                    </Button>
                                </FormGroup>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </FormArea>
    );
};

export default ComponentForm;
