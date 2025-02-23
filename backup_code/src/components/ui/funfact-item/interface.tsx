import { IGatsbyImageData } from "gatsby-plugin-image";

export interface FunfactItemProps {
    title: string;
    iconImage: {
        childImageSharp: IGatsbyImageData;
    };
    shapImage: {
        childImageSharp: IGatsbyImageData;
    };
    countNumber: number;
    countSymbol: string;
}
