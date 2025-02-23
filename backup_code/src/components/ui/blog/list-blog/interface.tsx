import { ImageDataLike } from "gatsby-plugin-image";

export interface ListBlogProps {
    thume_image: ImageDataLike;
    title: string;
    date: string;
    categories: string[];
    body: string;
    postAuthor: string;
    slug: string;
}
