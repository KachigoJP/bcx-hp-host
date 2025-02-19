import React from "react";

import { graphql, useStaticQuery } from "gatsby";
import { Col, Container, Row } from "react-bootstrap";

// Source
import LatestBlogItem from "@components/ui/blog/latest-blog";
import SectionTitle from "@components/common/title";
import { SectionArea } from "./style";
import { BlogItem } from "./interface";

const LatestBlog: React.FC = () => {
    const latestBlogQuery = useStaticQuery(graphql`
        query LatestBlogQuery {
            allMarkdownRemark {
                edges {
                    node {
                        id
                        frontmatter {
                            title
                            date(formatString: "MMMM DD YYYY")
                            categories
                            author
                            thume_image {
                                childImageSharp {
                                    gatsbyImageData(width: 580, height: 570)
                                }
                            }
                        }
                        fields {
                            slug
                        }
                        excerpt(pruneLength: 55)
                    }
                }
            }
        }
    `);
    const latestBlogData = latestBlogQuery.allMarkdownRemark.edges;
    return (
        <SectionArea>
            <Container>
                <Row>
                    <Col md={8} lg={6} className="m-auto">
                        <SectionTitle
                            textCenter
                            titleStyle
                            css={{
                                marginBottom: [
                                    "30px",
                                    "50px",
                                    "80px",
                                    "110",
                                    "123px",
                                ],
                            }}
                            subTitle={"Blog Post"}
                            title={"Latest News From Givest Blog"}
                        />
                    </Col>
                </Row>
                <Row>
                    {latestBlogData &&
                        latestBlogData.slice(0, 3).map((blog: BlogItem) => {
                            return (
                                <Col lg={4} md={6} sm={6} key={blog.node.id}>
                                    <LatestBlogItem
                                        title={blog.node.frontmatter.title}
                                        thume_image={
                                            blog.node.frontmatter.thume_image
                                        }
                                        categories={
                                            blog.node.frontmatter.categories
                                        }
                                        body={blog.node.excerpt}
                                        date={blog.node.frontmatter.date}
                                        postAuthor={
                                            blog.node.frontmatter.author
                                        }
                                        slug={blog.node.fields.slug}
                                    />
                                </Col>
                            );
                        })}
                </Row>
            </Container>
        </SectionArea>
    );
};

export default LatestBlog;
