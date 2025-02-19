import React from "react";
import { StaticImage } from "gatsby-plugin-image";

// Source
import SearchBox from "./search";
import UrgentCauses from "./causes";
import Categories from "./categories";
import Tags from "./tags";
import { SidebarArea, Widget, WidgetTitle, SeparatorLine } from "./style";
import { graphql, useStaticQuery } from "gatsby";

const BlogSidebar: React.FC = () => {
    // const categoriesQuery = useStaticQuery(graphql`
    //     query tagQueryAndCategoriesQuery {
    //         allMarkdownRemark {
    //             edges {
    //                 node {
    //                     frontmatter {
    //                         categories
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // `);

    const categories: any = []; // categoriesQuery.allMarkdownRemark.edges;

    // const tagQuery = useStaticQuery(graphql`
    //     query TagQuery {
    //         allMarkdownRemark {
    //             edges {
    //                 node {
    //                     frontmatter {
    //                         tags
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // `);
    const tags: any = []; //tagQuery.allMarkdownRemark.edges;

    return (
        <SidebarArea>
            <Widget>
                <WidgetTitle>Tim kiếm trong bài</WidgetTitle>
                <SeparatorLine>
                    <StaticImage
                        className="me-1"
                        src="../../../data/images/shape/line-t2.png"
                        alt="Image-Givest"
                    />
                </SeparatorLine>
                <SearchBox />
            </Widget>

            <Widget>
                <WidgetTitle>Causes Categories</WidgetTitle>
                <SeparatorLine>
                    <StaticImage
                        className="me-1"
                        src="../../../data/images/shape/line-t2.png"
                        alt="Image-Givest"
                    />
                </SeparatorLine>
                <div>
                    <Categories categories={categories} />
                </div>
            </Widget>

            <Widget>
                <WidgetTitle>Urgent Causes</WidgetTitle>
                <SeparatorLine>
                    <StaticImage
                        className="me-1"
                        src="../../../data/images/shape/line-t2.png"
                        alt="Image-Givest"
                    />
                </SeparatorLine>
                <UrgentCauses />
            </Widget>

            <Widget className="mb-0 pb-3">
                <WidgetTitle>Popular Tags</WidgetTitle>
                <SeparatorLine>
                    <StaticImage
                        className="me-1"
                        src="../../../data/images/shape/line-t2.png"
                        alt="Image-Givest"
                    />
                </SeparatorLine>
                <Tags tags={tags} />
            </Widget>
        </SidebarArea>
    );
};

export default BlogSidebar;
