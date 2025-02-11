import { IGatsbyImageData } from "gatsby-plugin-image";

export interface EventItemData {
    id: string;
    title: string;
    path: string;
    eventDate: string;
    eventSubject: string;
    thumbImg: {
        childImageSharp: IGatsbyImageData;
    };
    fields: {
        slug: string;
    };
    eventTime: string;
    eventAddress: string;
    eventSpeaker: string;
    detailsText1: string;
    detailsText2: string;
}
