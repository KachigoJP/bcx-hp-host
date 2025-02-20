import { IGatsbyImageData, ImageDataLike } from "gatsby-plugin-image";

export interface LogoProps {
    className?: string;
    alt?: string;
    logo: ImageDataLike | null;
}
