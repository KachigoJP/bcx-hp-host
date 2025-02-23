import { ImageDataLike } from "gatsby-plugin-image";

export interface CauseItemProps {
    title: string;
    dec: string;
    adminName: string;
    image: ImageDataLike;
    donateInfo: {
        donateTitle: string;
        amount: string;
    };
    adminImage: ImageDataLike;
    slug: string;
}
