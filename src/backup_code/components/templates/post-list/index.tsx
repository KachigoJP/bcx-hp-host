import React from "react";
import { graphql } from "gatsby";
import { Row, Container, Col } from "react-bootstrap";

import Layout from "@components/layout";
import SEO from "@components/common/seo";
// import PageBreadcrumb from "@components/pagebreadcrumb";
import BlogSidebar from "@components/ui/blog/blog-sidebar";
import BlogList from "@components/ui/blog/list-blog";
import PaginationLinks from "@components/common/pagination";
import { BlogPostContentArea, BlogDetailsArea } from "./style";
import { PostListProps } from "./interface";

const PostList: React.FC<PostListProps> = ({
    location,
    data,
    pageContext,
    ...props
}) => {
    const listBlogData = data.allMarkdownRemark.edges;
    const { currentPage, numberOfPages } = pageContext;

    return (
        <Layout>
            <SEO
                title={"Page 2 of 6 - Collections, News, Tips by Givest"}
                pathname="/"
                isBlogPost
            />
            {/* <PageBreadcrumb
                pageContext={pageContext}
                location={location}
                title="Blog Post"
            /> */}
            <BlogDetailsArea>
                <Container>
                    <Row>
                        <Col lg={8}>
                            <BlogPostContentArea>
                                {listBlogData &&
                                    listBlogData.map((blog, i) => {
                                        return (
                                            <BlogList
                                                key={i}
                                                title={blog.frontmatter.title}
                                                thume_image={null}
                                                categories={
                                                    blog.frontmatter.categories
                                                }
                                                body={blog.excerpt}
                                                date={blog.frontmatter.date}
                                                slug={blog.fields.slug}
                                                postAuthor={
                                                    blog.frontmatter.author
                                                }
                                            />
                                        );
                                    })}
                            </BlogPostContentArea>

                            <PaginationLinks
                                currentPage={currentPage}
                                numberOfPages={numberOfPages}
                            />
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

export const PlstListQuery = graphql`
    query postListQuery($skip: Int!, $limit: Int!) {
        allMarkdownRemark(
            sort: { frontmatter: { date: DESC } }
            limit: $limit
            skip: $skip
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
export default PostList;
