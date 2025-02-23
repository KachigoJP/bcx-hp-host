// Source

import { IGatsbyImageData } from "gatsby-plugin-image";

export interface Image {
    src: string;
    width: string;
    height: string;
}

export interface IPhoto {
    key: string;
    image: {
        childImageSharp: IGatsbyImageData;
    };
    alt: string;
}

export interface AllQuery<P> {
    edges: {
        node: P;
    }[];
}

export type NodeBuilderInput = {
    type: string;
    data: Record<string, unknown>;
};

export * from "@data/causes/interface";
export * from "@data/event/interface";
export * from "@components/containers/home/blog/interface";
export * from "@components/common/button/interface";
export * from "@components/common/seo/interface";
export * from "@components/common/video/interface";
export * from "@components/common/title/interface";
export * from "@components/ui/menu/interface";
export * from "@components/ui/causes/interface";
export * from "./response";
