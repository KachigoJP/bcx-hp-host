import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { graphql, useStaticQuery } from "gatsby";

// Source
import CausesItem from "@components/ui/causes";
import SectionTitle from "@components/common/title";
import { SectionArea } from "./style";
import { AllQuery, CauseItemData } from "../../../../interfaces";

const CausesArea: React.FC = () => {
    const causesAreaQuery = useStaticQuery(graphql`
        query CausesAreaQuery {
            allCausesJson {
                edges {
                    node {
                        id
                        title
                        dec
                        donateInfo {
                            amount
                            donateTitle
                        }
                        adminName
                        image {
                            childImageSharp {
                                gatsbyImageData(width: 580)
                            }
                        }
                        adminImage {
                            childImageSharp {
                                gatsbyImageData
                            }
                        }
                        fields {
                            slug
                        }
                    }
                }
            }
        }
    `);

    const causesAreaData =
        causesAreaQuery.allCausesJson as AllQuery<CauseItemData>;

    return (
        <SectionArea>
            <Container>
                <Row>
                    <Col lg={8} className="m-auto">
                        <SectionTitle
                            textCenter
                            titleStyle
                            css={{
                                mb: ["30px", "50px", "80px", "110", "123px"],
                            }}
                            title={"Các chuyến leo núi sắp tới"}
                            subTitle={"Hành trình"}
                        />
                    </Col>
                </Row>
                <Row>
                    {causesAreaData.edges &&
                        causesAreaData.edges.slice(0, 3).map((causesData) => {
                            return (
                                <Col
                                    lg={4}
                                    md={6}
                                    sm={6}
                                    key={causesData.node.id}
                                >
                                    <CausesItem
                                        image={causesData.node.image}
                                        title={causesData.node.title}
                                        dec={causesData.node.dec}
                                        adminName={causesData.node.adminName}
                                        adminImage={causesData.node.adminImage}
                                        slug={causesData.node.fields.slug}
                                        donateInfo={causesData.node.donateInfo}
                                    />
                                </Col>
                            );
                        })}
                </Row>
            </Container>
        </SectionArea>
    );
};

export default CausesArea;
