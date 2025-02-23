import React from "react";
import { getImage } from "gatsby-plugin-image";
import { Col, Container, Row } from "react-bootstrap";

// Source
import SectionTitle from "@components/common/title";
import SponsorLogo from "@components/ui/sponsors-logo";
import { usePhotos } from "@graphql/photos";
import { SectionArea, BrandLogoContent } from "./style";

const SponsorsArea: React.FC = () => {
    const photos = usePhotos();

    return (
        <SectionArea>
            <Container>
                <Row>
                    <Col
                        sm={{ span: 8, offset: 2 }}
                        md={{ span: 8, offset: 2 }}
                        lg={{ span: 4, offset: 0 }}
                        xl={4}
                    >
                        <SectionTitle
                            texttheme
                            css={{
                                mb: ["30px", "50px", "60px", "60px", "60px"],
                                mt: ["0px", "0px", "0px", "0px", "60px"],
                            }}
                            title={"Đồng hành cùng chúng tôi"}
                        />
                    </Col>
                    <Col xl={{ span: 7, offset: 1 }} lg={8}>
                        <BrandLogoContent>
                            <Row className="row row-cols-3 row-cols-sm-5">
                                <Col>
                                    <SponsorLogo
                                        sponsorLogo={
                                            photos.sponsor_sm2000.image
                                                .childImageSharp
                                        }
                                    />
                                </Col>
                            </Row>
                        </BrandLogoContent>
                    </Col>
                </Row>
            </Container>
        </SectionArea>
    );
};

export default SponsorsArea;
