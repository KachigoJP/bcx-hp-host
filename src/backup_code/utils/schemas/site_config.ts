import { NodePluginSchema } from "gatsby";

// Source
import { NODE_TYPES } from "../constants";

export const createSiteConfigSchema = (schema: NodePluginSchema) => {
    return schema.buildObjectType({
        name: "SiteConfig",
        fields: {
            id: "String!",
            name: "String!",
            title: "String!",
            url: "String!",
            keyword: "String!",
            description: "String!",
            slogan: "String!",
            total_donate: "String!",
            header_about: "String!",
            footer_about: "String!",
            logo: "Asset!",
            favicon: "Asset!",
            created_at: "String!",
            updated_at: "String!",
            deleted_at: "String!",
        },
    });
};
