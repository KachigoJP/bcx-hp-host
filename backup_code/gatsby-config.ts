import path from "path";
import type { GatsbyConfig } from "gatsby";

// Source
import AppConfig from "./src/config";

require("dotenv").config({
    path: ".env",
});

const config: GatsbyConfig = {
    siteMetadata: AppConfig,
    graphqlTypegen: true,
    plugins: [
        `gatsby-plugin-react-helmet`,
        "gatsby-plugin-image",
        `gatsby-plugin-emotion`,
        `gatsby-plugin-theme-ui`,
        "gatsby-plugin-styled-components",
        // "gatsby-plugin-google-gtag",
        "gatsby-plugin-sitemap",
        "gatsby-plugin-mdx",
        "gatsby-plugin-sharp",
        "gatsby-transformer-sharp",
        `gatsby-transformer-json`,
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: [
                    {
                        resolve: `gatsby-remark-images`,
                        options: {
                            maxWidth: 1920,
                        },
                    },
                ],
            },
        },
        {
            resolve: "gatsby-plugin-manifest",
            options: {
                icon: "src/assets/images/favicon.png",
            },
        },
        {
            resolve: "gatsby-source-filesystem",
            options: {
                name: "images",
                path: `${__dirname}/src/assets/images/`,
            },
            __key: "images",
        },
        {
            resolve: "gatsby-source-filesystem",
            options: {
                name: "pages",
                path: "./src/pages/",
            },
            __key: "pages",
        },
        {
            resolve: "gatsby-source-filesystem",
            options: {
                name: "data",
                path: `${__dirname}/src/data/`,
            },
        },
        {
            resolve: "gatsby-plugin-svgr-loader",
            options: {
                rule: {
                    include: /\.svg$/,
                },
            },
        },
        {
            resolve: "gatsby-plugin-manifest",
            options: {
                name: AppConfig.title,
                short_name: AppConfig.shortName,
                theme_color: AppConfig.themeColor,
                background_color: AppConfig.backgroundColor,
                display: "standalone",
                scope: "/",
                start_url: "/",
                icon: AppConfig.favicon,
                icons: [
                    {
                        src: "/icons/icon-72x72.png",
                        sizes: "72x72",
                        type: "image/png",
                    },
                    {
                        src: "/icons/icon-96x96.png",
                        sizes: "96x96",
                        type: "image/png",
                    },
                    {
                        src: "/icons/icon-128x128.png",
                        sizes: "128x128",
                        type: "image/png",
                    },
                    {
                        src: "/icons/icon-144x144.png",
                        sizes: "144x144",
                        type: "image/png",
                    },
                    {
                        src: "/icons/icon-152x152.png",
                        sizes: "152x152",
                        type: "image/png",
                    },
                    {
                        src: "/icons/icon-192x192.png",
                        sizes: "192x192",
                        type: "image/png",
                    },
                    {
                        src: "/icons/icon-384x384.png",
                        sizes: "384x384",
                        type: "image/png",
                    },
                    {
                        src: "/icons/icon-512x512.png",
                        sizes: "512x512",
                        type: "image/png",
                    },
                ],
            },
        },
        {
            resolve: `gatsby-plugin-alias-imports`,
            options: {
                alias: {
                    "@assets": path.resolve(__dirname, "./src/assets"),
                    "@components": path.resolve(__dirname, "./src/components"),
                    "@config": path.resolve(__dirname, "./src/config"),
                    "@data": path.resolve(__dirname, "./src/data"),
                    "@pages": path.resolve(__dirname, "./src/pages"),
                    "@theme": path.resolve(__dirname, "./src/theme"),
                    "@utils": path.resolve(__dirname, "./src/utils"),
                    // "@constants": path.resolve(__dirname, "./src/constants"),
                    // "@hooks": path.resolve(__dirname, "./src/hooks"),
                    "@i18n": path.resolve(__dirname, "./src/i18n"),
                    "@interfaces": path.resolve(__dirname, "./src/interfaces"),
                    "@graphql": path.resolve(__dirname, "./src/graphql"),
                },
                extensions: [".ts", ".tsx"],
            },
        },
    ],
};

export default config;
