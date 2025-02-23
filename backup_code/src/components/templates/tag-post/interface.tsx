import { AllQuery, BlogItem } from "../../../interfaces";

export interface SingleTagProps {
    data: {
        allMarkdownRemark: AllQuery<BlogItem>;
    };
    location: Location;
    pageContext: any;
}
