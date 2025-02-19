import { IPhoto } from "@interfaces/index";
import { graphql, useStaticQuery } from "gatsby";

export const usePhotos = () => {
    const { allPhotoJson } = useStaticQuery(
        graphql`
            query {
                allPhotoJson {
                    edges {
                        node {
                            key
                            image {
                                childImageSharp {
                                    gatsbyImageData
                                }
                            }
                            alt
                        }
                    }
                }
            }
        `
    );

    const photos: Record<string, IPhoto> = {};

    for (const photo of allPhotoJson.edges) {
        photos[photo.node.key] = photo.node as IPhoto;
    }

    return photos;
};
