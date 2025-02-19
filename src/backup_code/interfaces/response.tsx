import { ImageDataLike } from "gatsby-plugin-image";

export interface ISetting {
    id: string;
    key: string;
    value: string;
    type: string;
    image: ImageDataLike | null;
    description: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    provider: string;
}

export interface IService {
    id: string;
    key: string;
    title: string;
    sub_title: string;
    image: ImageDataLike | null;
    content: string;
    tag: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    provider: string;
}

export interface ITestimonial {
    id: string;
    person_name: string;
    person_title: string;
    person_photo: ImageDataLike | null;
    content: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    provider: string;
}
