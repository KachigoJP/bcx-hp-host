import React from "react";
import { graphql } from "gatsby";
import { Row, Container, Col } from "react-bootstrap";

import Layout from "@components/layout";
import SEO from "@components/common/seo";
import BlogSidebar from "@components/ui/blog/blog-sidebar";
import BlogList from "@components/ui/blog/list-blog";
import { BlogPostContentArea, BlogDetailsArea } from "./style";
import { BlogCategoriesPostProps } from "./interface";

const CategorisPosts: React.FC<BlogCategoriesPostProps> = (props) => {
    const { data, location, pageContext } = props;

    return (
        <Layout>
            <SEO title={"Blog Categories Post"} pathname="/" />
            <BlogDetailsArea>
                <Container>
                    <Row>
                        <Col lg={8}>
                            <BlogPostContentArea>
                                {data.allMarkdownRemark.edges.map((blog, i) => {
                                    return (
                                        <BlogList
                                            key={i}
                                            title={blog.frontmatter.title}
                                            thume_image={
                                                blog.frontmatter.thume_image
                                            }
                                            categories={
                                                blog.frontmatter.categories
                                            }
                                            body={blog.excerpt}
                                            date={blog.frontmatter.date}
                                            slug={blog.fields.slug}
                                            postAuthor={blog.frontmatter.author}
                                        />
                                    );
                                })}
                            </BlogPostContentArea>
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

export const CategorieQuery = graphql`
    query ($categorie: String!) {
        allMarkdownRemark(
            sort: { frontmatter: { date: DESC } }
            filter: { frontmatter: { tags: { in: [$categorie] } } }
        ) {
            edges {
                node {
                    id
                    frontmatter {
                        author
                        categories
                        date(formatString: "MMMM DD YYYY")
                        tags
                        quote_text
                        title
                        thume_image {
                            childImageSharp {
                                gatsbyImageData(width: 750, height: 400)
                            }
                        }
                    }
                    fields {
                        slug
                    }
                    excerpt(pruneLength: 100, truncate: true)
                }
            }
        }
    }
`;

export default CategorisPosts;
