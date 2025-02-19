import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { graphql, useStaticQuery } from "gatsby";
import { useTranslation } from "react-i18next";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Tilt from "react-parallax-tilt";

// Source
import AboutItem from "./about_item";
import { SectionArea } from "./style";
import { IService } from "@interfaces/response";

const AboutArea: React.FC = () => {
    const { t } = useTranslation();
    const aboutSectionQuery = useStaticQuery(graphql`
        query {
            allService {
                nodes {
                    id
                    key
                    title
                    sub_title
                    image {
                        gatsbyImage(width: 800)
                    }
                    content
                    tag
                }
            }
        }
    `);

    return (
        <SectionArea id="about-us">
            <Container>
                {aboutSectionQuery.allService.nodes.map(
                    (item: IService, index: number) => {
                        return (
                            <Row key={index}>
                                <AboutItem
                                    title={item.title}
                                    subTitle={item.sub_title}
                                    image={getImage(item.image)}
                                    content={item.content}
                                    type={index % 2 ? "right" : "left"}
                                />
                            </Row>
                        );
                    }
                )}
            </Container>
        </SectionArea>
    );
};

export default AboutArea;
