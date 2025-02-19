import React from "react";
import { graphql, Link } from "gatsby";
import { Row, Container, Col } from "react-bootstrap";
import { StaticImage, GatsbyImage, getImage } from "gatsby-plugin-image";

import Layout from "@components/layout";
import SEO from "@components/common/seo";
// import PageBreadcrumb from "@components/pagebreadcrumb";
import BlogSidebar from "@components/ui/blog/blog-sidebar";
import CausesDonateForm from "@components/ui/causes-donate-form";
import {
    BlogDetailsArea,
    CausesDetailsContent,
    CausesDetails,
    Thumb,
    CauseTitle,
    DonateInfoWrap,
    DonateInfo,
    InfoItem,
    InfoItemTitle,
    Amount,
    ShortTitle,
    DocumentItem,
    DocumentItemTitle,
    SingleDetailsText,
} from "./style";
import { CausesDetailProps } from "./interface";

const CausesPosts: React.FC<CausesDetailProps> = (props) => {
    const { data, location, pageContext } = props;
    const causespostData = data.causesJson;

    const image = getImage(causespostData.image);

    return (
        <Layout>
            <SEO title={"Chi tiết hành trình"} pathname="/" />
            {/* <PageBreadcrumb
                pageContext={pageContext}
                location={location}
                title="Chi tiết hành trình"
            /> */}
            <BlogDetailsArea>
                <Container>
                    <Row>
                        <Col lg={8}>
                            <CausesDetailsContent>
                                <CausesDetails>
                                    <Thumb>
                                        {image ? (
                                            <GatsbyImage
                                                image={image}
                                                alt={causespostData.title}
                                            />
                                        ) : null}
                                    </Thumb>
                                    <CauseTitle>
                                        {causespostData.title}
                                    </CauseTitle>
                                    {/* <DonateInfoWrap>
                                        <Row>
                                            <Col md={6}>
                                                <DonateInfo>
                                                    <InfoItem>
                                                        <InfoItemTitle>
                                                            Goal:
                                                        </InfoItemTitle>
                                                        <Amount>$ 5,000</Amount>
                                                    </InfoItem>
                                                    <InfoItem>
                                                        <InfoItemTitle>
                                                            Raised:
                                                        </InfoItemTitle>
                                                        <Amount>$ 2,000</Amount>
                                                    </InfoItem>
                                                    <InfoItem>
                                                        <InfoItemTitle>
                                                            To Go:
                                                        </InfoItemTitle>
                                                        <Amount>$ 1,000</Amount>
                                                    </InfoItem>
                                                </DonateInfo>
                                            </Col>
                                        </Row>
                                    </DonateInfoWrap> */}
                                    <SingleDetailsText>
                                        {causespostData.detailstext1 &&
                                            causespostData.detailstext1}
                                    </SingleDetailsText>
                                    <SingleDetailsText>
                                        {causespostData.detailstext2 &&
                                            causespostData.detailstext2}
                                    </SingleDetailsText>
                                    {/* <ShortTitle>Cause Challenge</ShortTitle> */}
                                    <SingleDetailsText>
                                        {causespostData.detailstext3 &&
                                            causespostData.detailstext3}
                                    </SingleDetailsText>
                                    <SingleDetailsText>
                                        {causespostData.detailstext4 &&
                                            causespostData.detailstext4}
                                    </SingleDetailsText>
                                    {/* <ShortTitle>
                                        Summery And Documents
                                    </ShortTitle>
                                    <Row>
                                        <Col sm={6}>
                                            <DocumentItem href="#">
                                                <DocumentItemTitle>
                                                    Summery.pdf
                                                </DocumentItemTitle>
                                                <StaticImage
                                                    src="../../data/images/icons/file.png"
                                                    alt="Icon"
                                                />
                                            </DocumentItem>
                                        </Col>
                                        <Col sm={6}>
                                            <DocumentItem className="bgcolor-theme2">
                                                <DocumentItemTitle href="#">
                                                    Documents.pdf
                                                </DocumentItemTitle>
                                                <StaticImage
                                                    src="../../data/images/icons/file.png"
                                                    alt="Icon"
                                                />
                                            </DocumentItem>
                                        </Col>
                                    </Row> */}
                                    <SingleDetailsText>
                                        {causespostData.detailstext5 &&
                                            causespostData.detailstext5}
                                    </SingleDetailsText>
                                    <SingleDetailsText>
                                        {causespostData.detailstext6 &&
                                            causespostData.detailstext6}
                                    </SingleDetailsText>
                                </CausesDetails>

                                <CausesDonateForm />
                            </CausesDetailsContent>
                        </Col>
                        <Col lg={4}>
                            <BlogSidebar />
                        </Col>
                    </Row>
                </Container>
            </BlogDetailsArea>
        </Layout>
    );
};

export const causespostQuery = graphql`
    query CausesPostsBySlug($slug: String!) {
        causesJson(fields: { slug: { eq: $slug } }) {
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
                    gatsbyImageData(width: 780)
                }
            }
            adminImage {
                childImageSharp {
                    gatsbyImageData
                }
            }
            detailstext1
            detailstext2
            detailstext3
            detailstext4
            detailstext5
            detailstext6
            fields {
                slug
            }
        }
    }
`;
export default CausesPosts;
