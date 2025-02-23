import { BlogItem } from "../../../interfaces";

export interface PostListProps {
    data: {
        allMarkdownRemark: {
            edges: BlogItem[];
        };
    };
    location: Location;
    pageContext: any;
}
