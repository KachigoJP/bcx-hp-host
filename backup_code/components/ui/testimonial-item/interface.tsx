import { IGatsbyImageData } from "gatsby-plugin-image";

export interface TestimonialItemProps {
    client: string;
    clientSaidText: string;
    clientDesignation: string;
    clientImage: IGatsbyImageData;
}
