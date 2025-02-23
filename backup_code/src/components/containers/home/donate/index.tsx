import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import SectionTitle from "@components/common/title";
import DonateForm from "@components/ui/donate-form";
import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import {
    SectionArea,
    TdonnersConten,
    DonnersInfo,
    DonnersItems,
    DonnerIem,
    DonnerNumber,
} from "./style";
import { DonateItemData } from "./interface";

const DonateArea: React.FC = () => {
    const greatDonnerData = useStaticQuery(graphql`
        query GreatDonnerQuery {
            greatDonnersJson {
                id
                title
                subTitle
                desction
                donnerTitle
                donnerCountTotal
                donnerItemList {
                    donnerImage {
                        childrenImageSharp {
                            gatsbyImageData
                        }
                    }
                }
            }
        }
    `);
    const {
        title,
        subTitle,
        donnerTitle,
        desction,
        donnerCountTotal,
        donnerItemList,
    } = greatDonnerData.greatDonnersJson as DonateItemData;

    return (
        <SectionArea>
            <Container>
                <Row>
                    <Col lg={7} xxl={7}>
                        <div className="content">
                            <SectionTitle
                                textWhate
                                titleStyle
                                css={{
                                    mb: [
                                        "30px",
                                        "50px",
                                        "80px",
                                        "100px",
                                        "100px",
                                    ],
                                }}
                                title={title}
                                subTitle={subTitle}
                            />
                            <DonateForm />
                        </div>
                    </Col>
                    <Col lg={4} className="col-xxl-4 offset-xxl-1">
                        <TdonnersConten>
                            <div className="thumb-bg-layer"></div>
                            <DonnersInfo>
                                <h3>{donnerTitle}</h3>
                                <p>{desction}</p>
                                <DonnersItems>
                                    {donnerItemList &&
                                        donnerItemList.map((item, i) => {
                                            const img = getImage(
                                                item.donnerImage
                                                    .childrenImageSharp[0]
                                            );

                                            return img ? (
                                                <DonnerIem
                                                    key={`donnerer-${i}`}
                                                >
                                                    <GatsbyImage
                                                        image={img}
                                                        alt="Image-Givest"
                                                    />
                                                </DonnerIem>
                                            ) : null;
                                        })}
                                    <DonnerNumber>
                                        {donnerCountTotal}
                                    </DonnerNumber>
                                </DonnersItems>
                            </DonnersInfo>
                        </TdonnersConten>
                    </Col>
                </Row>
            </Container>
        </SectionArea>
    );
};

export default DonateArea;
