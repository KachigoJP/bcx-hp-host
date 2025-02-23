/** @jsx jsx */
import { jsx } from "theme-ui";
import PropTypes from "prop-types";
import Layout from "@layout";
import SEO from "@components/seo";
import PageBreadcrumb from "@components/pagebreadcrumb";
import { graphql, Link } from "gatsby";
import { Row, Container, Col } from "react-bootstrap";
import BlogSidebar from "@containers/blog/blog-sideber";
import { StaticImage, GatsbyImage, getImage } from "gatsby-plugin-image";
import {
    ServicesDetailsArea,
    ServicesDetailsContent,
    ServicesDetails,
    Thumb,
    ServicesTitle,
    DocumentItem,
    DocumentItemTitle,
} from "./style";

const ServicesPosts = ({ data, location, pageContext }) => {
    const servicesPostData = data.serversJson;

    const image = getImage(servicesPostData.image.childImageSharp);

    return (
        <Layout>
            <SEO title={"Sevices Details"} pathname="/" />
            <PageBreadcrumb
                pageContext={pageContext}
                location={location}
                title="Sevices Details"
            />
            <ServicesDetailsArea>
                <Container>
                    <Row>
                        <Col lg={8}>
                            <ServicesDetailsContent>
                                <ServicesDetails>
                                    <Thumb>
                                        <GatsbyImage
                                            image={image}
                                            alt={servicesPostData.title}
                                        />
                                    </Thumb>
                                    <ServicesTitle>
                                        {servicesPostData.title}
                                    </ServicesTitle>
                                    <p>{servicesPostData.parText}</p>
                                    <p>
                                        {servicesPostData &&
                                            servicesPostData.destails1}
                                    </p>
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
                                            <DocumentItem
                                                className="bgcolor-theme2"
                                                href="#"
                                            >
                                                <DocumentItemTitle href="#">
                                                    Documents.pdf
                                                </DocumentItemTitle>
                                                <StaticImage
                                                    src="../../data/images/icons/file.png"
                                                    alt="Icon"
                                                />
                                            </DocumentItem>
                                        </Col>
                                    </Row>

                                    <p>
                                        {servicesPostData &&
                                            servicesPostData.destails2}
                                    </p>
                                    <p>
                                        {servicesPostData &&
                                            servicesPostData.destails3}
                                    </p>
                                    <p>
                                        {servicesPostData &&
                                            servicesPostData.destails4}
                                    </p>
                                </ServicesDetails>
                            </ServicesDetailsContent>
                        </Col>
                        <Col lg={4}>
                            <BlogSidebar />
                        </Col>
                    </Row>
                </Container>
            </ServicesDetailsArea>
        </Layout>
    );
};

ServicesPosts.propTypes = {
    data: PropTypes.object,
    location: PropTypes.object,
    pageContext: PropTypes.object,
};

export const servicesPostsQuery = graphql`
    query ServicesPostsBySlug($slug: String!) {
        serversJson(fields: { slug: { eq: $slug } }) {
            id
            title
            parText
            itemClassName
            destails1
            destails2
            destails3
            destails4
            image {
                childImageSharp {
                    gatsbyImageData(width: 780)
                }
            }
        }
    }
`;
export default ServicesPosts;
