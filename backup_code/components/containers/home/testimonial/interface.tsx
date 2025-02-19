import { IGatsbyImageData } from "gatsby-plugin-image";

export interface ITestimoniaItem {
    id: string;
    person_name: string;
    person_title: string;
    person_photo: {
        childImageSharp: IGatsbyImageData;
    };
    content: string;
}
