import { BlogItem } from "../../../interfaces";

export interface BlogCategoriesPostProps {
    data: {
        allMarkdownRemark: {
            edges: BlogItem[];
        };
    };
    location: Location;
    pageContext: any;
}
