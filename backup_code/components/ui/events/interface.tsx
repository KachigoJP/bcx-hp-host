import { IGatsbyImageData } from "gatsby-plugin-image";

export interface EventItemProps {
    title: string;
    eventDate: string;
    eventSubject: string;
    thumbImg: IGatsbyImageData;
    slug: string;
}
