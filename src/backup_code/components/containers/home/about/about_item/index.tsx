import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { graphql, useStaticQuery } from "gatsby";
import { useTranslation } from "react-i18next";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Tilt from "react-parallax-tilt";

// Source
import SectionTitle from "@components/common/title";
import {
    SectionArea,
    LayerStyle,
    Thumb,
    AboutTextStyle,
    AboutContent,
} from "./style";
import { AboutItemProps } from "./interface";

const AboutArea: React.FC<AboutItemProps> = (props) => {
    const { t } = useTranslation();

    const imageComponent = () => {
        return (
            <LayerStyle>
                <Thumb>
                    <Row className="m-0">
                        <Col
                            sm={12}
                            md={12}
                            lg={12}
                            xl={12}
                            className="tilt-animation"
                        >
                            <Tilt
                                className=" js-tilt"
                                scale={1.04}
                                tiltReverse={true}
                                tiltMaxAngleX={15}
                                tiltMaxAngleY={15}
                                perspective={3000}
                                transitionSpeed={4000}
                            >
                                {props.image ? (
                                    <GatsbyImage
                                        image={props.image}
                                        alt="Image-Givest"
                                    />
                                ) : null}
                            </Tilt>
                        </Col>
                    </Row>
                </Thumb>
            </LayerStyle>
        );
    };

    const contentComponent = () => {
        return (
            <AboutContent>
                <AboutTextStyle>{props.content}</AboutTextStyle>
            </AboutContent>
        );
    };

    return (
        <SectionArea>
            <Container>
                <Row>
                    <Col lg={9}>
                        <SectionTitle
                            css={{ mb: "30px" }}
                            showImage={false}
                            title={props.title}
                            subTitle={props.subTitle}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col lg={6} xl={6}>
                        {props.type == "left"
                            ? imageComponent()
                            : contentComponent()}
                    </Col>
                    <Col lg={6} xl={6}>
                        {props.type == "left"
                            ? contentComponent()
                            : imageComponent()}
                    </Col>
                </Row>
            </Container>
        </SectionArea>
    );
};

export default AboutArea;
