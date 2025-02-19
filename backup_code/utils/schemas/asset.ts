import { NodePluginSchema } from "gatsby";

// Source

export const createAssetSchema = (schema: NodePluginSchema) => {
    return schema.buildObjectType({
        name: "Asset",
        fields: {
            url: "String!",
            alt: "String!",
            width: "Int!",
            height: "Int!",
        },
        interfaces: ["Node", "RemoteFile"],
    });
};
