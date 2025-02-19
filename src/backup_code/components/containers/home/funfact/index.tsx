import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { Col, Container, Row } from "react-bootstrap";

// Source
import FunfactItem from "@components/ui/funfact-item";
import { useSettings } from "@graphql/settings";
import { SectionArea } from "./style";
import { usePhotos } from "@graphql/photos";

const FunfactArea: React.FC = () => {
    const settings = useSettings();
    const photos = usePhotos();

    return (
        <SectionArea>
            <Container>
                <Row className="row-gutter-0 funfact-items-style1">
                    <Col md={4} sm={6} className="funfact-item">
                        <FunfactItem
                            countNumber={parseInt(settings.member_num.value)}
                            countSymbol=""
                            title={"Người tham gia"}
                            iconImage={photos.icon_1.image}
                            shapImage={photos.shape_4.image}
                        />
                    </Col>

                    <Col md={4} sm={6} className="funfact-item">
                        <FunfactItem
                            countNumber={parseInt(settings.trip_num.value)}
                            countSymbol=""
                            title={"Hành Trình"}
                            iconImage={photos.icon_2.image}
                            shapImage={photos.shape_4.image}
                        />
                    </Col>

                    <Col md={4} sm={6} className="funfact-item">
                        <FunfactItem
                            countNumber={parseInt(settings.school_num.value)}
                            countSymbol=""
                            title={"Ngôi trường đã xây"}
                            iconImage={photos.icon_3.image}
                            shapImage={photos.shape_4.image}
                        />
                    </Col>
                </Row>
            </Container>
        </SectionArea>
    );
};

export default FunfactArea;
