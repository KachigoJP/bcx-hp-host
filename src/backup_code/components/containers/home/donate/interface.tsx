import { ImageDataLike } from "gatsby-plugin-image";

export interface DonateItemData {
    id: string;
    title: string;
    subTitle: string;
    desction: string;
    donnerTitle: string;
    donnerCountTotal: string;
    donnerItemList: {
        donnerImage: {
            childrenImageSharp: {
                gatsbyImageData: ImageDataLike;
            }[];
        };
    }[];
}
