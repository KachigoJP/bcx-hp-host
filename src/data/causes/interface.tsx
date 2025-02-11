import { IGatsbyImageData } from "gatsby-plugin-image";

export interface CauseItemData {
    id: string;
    title: string;
    dec: string;
    adminName: string;
    image: IGatsbyImageData;
    donateInfo: {
        donateTitle: string;
        amount: string;
    };
    adminImage: IGatsbyImageData;
    fields: {
        slug: string;
    };
    detailstext1: string;
    detailstext2: string;
    detailstext3: string;
    detailstext4: string;
    detailstext5: string;
    detailstext6: string;
}
