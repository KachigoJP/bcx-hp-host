import { IGatsbyImageData } from "gatsby-plugin-image";

export interface AboutItemProps {
    title: string;
    subTitle: string;
    image: IGatsbyImageData | undefined;
    content: string;
    type: "left" | "right";
}
