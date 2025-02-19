import { IGatsbyImageData } from "gatsby-plugin-image";

export interface BlogItem {
    id: string;
    frontmatter: {
        title: string;
        date: `${number} ${number} ${number}`;
        categories: string[];
        author: string;
        thume_image: {
            childImageSharp: {
                gatsbyImageData: IGatsbyImageData;
            };
        };
        tags: string[];
    };
    fields: {
        slug: string;
    };
    excerpt: string;
    html: string;
}
