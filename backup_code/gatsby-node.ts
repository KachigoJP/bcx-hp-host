import path from "path";
import _ from "lodash";
import {
    CreateWebpackConfigArgs,
    GatsbyNode,
    NodeInput,
    SourceNodesArgs,
} from "gatsby";
import type { IRemoteImageNodeInput } from "gatsby-plugin-utils";
import type { createRemoteFileNode } from "gatsby-source-filesystem";
import probe from "probe-image-size";

// Source
import { slugify } from "./src/utils/functions";
import { NodeBuilderInput } from "./src/interfaces";
import { IService, ISetting, ITestimonial } from "./src/interfaces/response";

// Single Post Page
export const onCreateNode: GatsbyNode["onCreateNode"] = ({
    node,
    actions,
}: any) => {
    const { createNodeField } = actions;

    // fields create in qrapql file
    if (node.internal.type === "MarkdownRemark") {
        const slugFromTitle = slugify(node.frontmatter.title);
        createNodeField({
            node,
            name: "slug",
            value: slugFromTitle,
        });
    }

    // Sevices Json File Create
    if (node.internal.type === "ServersJson") {
        createNodeField({
            node,
            name: "slug",
            value: slugify(node.title),
        });
    }
    // Causes Json File Create
    if (node.internal.type === "CausesJson") {
        createNodeField({
            node,
            name: "slug",
            value: slugify(node.title),
        });
    }

    // Events Json File Create
    if (node.internal.type === "EventJson") {
        createNodeField({
            node,
            name: "slug",
            value: slugify(node.title),
        });
    }
};

export const createPages: GatsbyNode["createPages"] = ({
    actions,
    graphql,
}) => {
    const { createPage } = actions;
    // const singlePostTemplate = path.resolve("src/templates/single-post.js");
    // const templates = {
    //     singlePost: path.resolve("src/templates/single-post/index.js"),
    //     tagPosts: path.resolve("src/templates/tag-post/index.js"),
    //     categoriePosts: path.resolve("src/templates/categories-post/index.js"),
    //     postList: path.resolve("src/templates/post-list/index.js"),
    //     causesPost: path.resolve("src/templates/causes-details/index.js"),
    //     eventPosts: path.resolve("src/templates/event-details/index.js"),
    //     servicesPosts: path.resolve("src/templates/services-details/index.js"),
    // };

    // return graphql(`
    //     {
    //         allMarkdownRemark {
    //             edges {
    //                 node {
    //                     frontmatter {
    //                         author
    //                         tags
    //                         categories
    //                     }
    //                     fields {
    //                         slug
    //                     }
    //                 }
    //             }
    //         }

    //         allServersJson {
    //             edges {
    //                 node {
    //                     fields {
    //                         slug
    //                     }
    //                 }
    //             }
    //         }

    //         allCausesJson {
    //             edges {
    //                 node {
    //                     fields {
    //                         slug
    //                     }
    //                 }
    //             }
    //         }

    //         allEventJson {
    //             edges {
    //                 node {
    //                     fields {
    //                         slug
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // `).then((res: any) => {
    //     if (res.errors) return Promise.reject(res.errors);

    //     // Create Single Blog Post Page
    //     const posts = res.data.allMarkdownRemark.edges;

    //     posts.forEach(({ node }: any) => {
    //         createPage({
    //             path: node.fields.slug,
    //             component: templates.singlePost,
    //             context: {
    //                 // Pssing slug for Templates to use to get post
    //                 slug: node.fields.slug,
    //                 // Find author imageUrl from author and pass it to the single post templates
    //                 //imageUrl: authors.find(x => x.name === node.frontmatter.author).imageUrl
    //             },
    //         });
    //     });

    //     // Serives Causes Details Page
    //     const serversJson = res.data.allServersJson.edges;
    //     serversJson.forEach(({ node }: any) => {
    //         createPage({
    //             path: `/services/${node.fields.slug}`,
    //             component: templates.servicesPosts,
    //             context: {
    //                 slug: node.fields.slug,
    //             },
    //         });
    //     });
    //     // Create Causes Details Page
    //     const causesJson = res.data.allCausesJson.edges;
    //     causesJson.forEach(({ node }: any) => {
    //         createPage({
    //             path: `/causes/${node.fields.slug}`,
    //             component: templates.causesPost,
    //             context: {
    //                 slug: node.fields.slug,
    //             },
    //         });
    //     });

    //     // Create Events Details Page
    //     const eventJson = res.data.allEventJson.edges;
    //     eventJson.forEach(({ node }: any) => {
    //         createPage({
    //             path: `/events/${node.fields.slug}`,
    //             component: templates.eventPosts,
    //             context: {
    //                 slug: node.fields.slug,
    //             },
    //         });
    //     });

    //     // Get all Tag
    //     let tags: any[] = [];
    //     _.each(posts, (edge) => {
    //         if (_.get(edge, "node.frontmatter.tags")) {
    //             tags = tags.concat(edge.node.frontmatter.tags);
    //         }
    //     });
    //     // Tag Number Count
    //     let tagPostCounts: any = {};
    //     tags.forEach((tag) => {
    //         tagPostCounts[tag] = (tagPostCounts[tag] || 0) + 1;
    //     });
    //     tags = _.uniq(tags);

    //     // Tag Post Page Create
    //     tags.forEach((tag) => {
    //         createPage({
    //             path: `/tag/${slugify(tag)}`,
    //             component: templates.tagPosts,
    //             context: {
    //                 tag,
    //             },
    //         });
    //     });

    //     // Get all Categorie Post
    //     let categories: any[] = [];
    //     _.each(posts, (edge) => {
    //         if (_.get(edge, "node.frontmatter.categories")) {
    //             categories = categories.concat(
    //                 edge.node.frontmatter.categories
    //             );
    //         }
    //     });
    //     // Categorie Post Page Create
    //     categories.forEach((categorie) => {
    //         createPage({
    //             path: `/categories/${slugify(categorie)}`,
    //             component: templates.categoriePosts,
    //             context: {
    //                 categorie,
    //             },
    //         });
    //     });

    //     // Post List pagintion
    //     const postsPerPage = 3;
    //     const numberOfPages = Math.ceil(posts.length / postsPerPage);

    //     Array.from({ length: numberOfPages }).forEach((_, index) => {
    //         const inFirstPage = index === 0;
    //         const currentPage = index + 1;

    //         if (inFirstPage) return;

    //         createPage({
    //             path: `/blog/${currentPage}`,
    //             component: templates.postList,
    //             context: {
    //                 limit: postsPerPage,
    //                 skip: index * postsPerPage,
    //                 currentPage,
    //                 numberOfPages,
    //             },
    //         });
    //     });
    // });
};

export const createSchemaCustomization: GatsbyNode[`createSchemaCustomization`] =
    ({ actions, schema }) => {
        const { createTypes } = actions;

        createTypes(`
            type Setting implements Node {
                _id: Int!
                id: String!
                key: String!
                value: String!
                type: String!
                description: String!
                image: ImageAsset @link
            }
            type Service implements Node {
                _id: Int!
                id: String!
                key: String!
                title: String!
                sub_title: String!
                image: ImageAsset @link
                content: String!
                tag: String!
            }
            type Testimonial implements Node {
                _id: Int!
                id: String!
                person_name: String!
                person_photo: ImageAsset @link
                person_title: String!
                content: String!
            }
            type ImageAsset implements Node & RemoteFile {
                url: String
                mimeType: String
                filename: String
                filesize: String
                width: Int!
                height: Int!
            }
        `);
    };

export const sourceNodes: GatsbyNode["sourceNodes"] = async (gatsbyApi) => {
    const settings = await fetch(`${process.env.API_URL}/settings`);
    const settingsData: any = await settings.json();

    settingsData.data.forEach((item: ISetting) => {
        nodeBuilder(gatsbyApi, {
            type: "Setting",
            data: item as unknown as Record<string, unknown>,
        });
    });

    const services = await fetch(`${process.env.API_URL}/services`);
    const servicesData: any = await services.json();

    servicesData.data.forEach((item: ISetting) => {
        nodeBuilder(gatsbyApi, {
            type: "Service",
            data: item as unknown as Record<string, unknown>,
        });
    });

    const testimonials = await fetch(`${process.env.API_URL}/testimonials`);
    const testimonialsData: any = await testimonials.json();

    testimonialsData.data.forEach((item: ITestimonial) => {
        nodeBuilder(gatsbyApi, {
            type: "Testimonial",
            data: item as unknown as Record<string, unknown>,
        });
    });
};

const nodeBuilder = async (
    gatsbyApi: SourceNodesArgs,
    input: NodeBuilderInput
) => {
    const id = gatsbyApi.createNodeId(`${input.type}-${input.data.id}`);

    const data: Record<string, unknown> = input.data as unknown as Record<
        string,
        unknown
    >;

    if (input.type === "Setting") {
        if (input.data.type == "image") {
            data.image = await createAssetNode(
                gatsbyApi,
                input.data.value as string
            );
        }
    }

    if (input.type === "Service") {
        data.image = await createAssetNode(
            gatsbyApi,
            input.data.image as string
        );
    }

    if (input.type === "Testimonial" && input.data.person_photo !== "") {
        data.person_photo = await createAssetNode(
            gatsbyApi,
            input.data.person_photo as string
        );
    }

    const node = {
        ...data,
        id,
        _id: data.id,
        parent: null,
        children: [],
        internal: {
            type: input.type,
            contentDigest: gatsbyApi.createContentDigest(data),
        },
    };

    await gatsbyApi.actions.createNode(node);
};

const createAssetNode = async (
    gatsbyApi: SourceNodesArgs,
    imageUrl: string
) => {
    const imageAttr = await probe(imageUrl);

    const id = gatsbyApi.createNodeId(`ImageAsset-${imageUrl}`);

    const imageData = {
        url: imageUrl,
        mimeType: imageAttr.mime,
        filename: imageUrl,
        filesize: imageAttr.length,
        width: imageAttr.width,
        height: imageAttr.height,
    };

    const assetNode = {
        ...imageData,
        id,
        parent: null,
        children: [],
        internal: {
            type: "ImageAsset",
            contentDigest: gatsbyApi.createContentDigest(imageData),
        },
    };

    await gatsbyApi.actions.createNode(assetNode);

    return id;
};
