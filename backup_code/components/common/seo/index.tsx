import React from "react";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";

// Source
import { SEOProps } from "./interface";

const SEO: React.FC<SEOProps> = (props) => {
    const { site } = useStaticQuery(
        graphql`
            query {
                site {
                    siteMetadata {
                        title
                        description
                        author
                        keywords
                        siteUrl
                        canonical
                        siteLanguage
                        image
                        titleTemplate
                        mainUrl
                    }
                    buildTime
                }
            }
        `
    );

    let pageUrl;
    const path = props.pathname.replace(/^\/|\/$/g, "");
    const metaTitle = props.title || site.siteMetadata.title;
    const template = props.titleTemplate || site.siteMetadata.titleTemplate;
    const metaDescription = props.description || site.siteMetadata.description;
    const language = props.lang || site.siteMetadata.siteLanguage;
    const siteUrl = site.siteMetadata.siteUrl.replace(/\/$/, "");
    const mainUrl = site.siteMetadata.mainUrl.replace(/\/$/, "");
    const bannerImage =
        props.image && props.image.src
            ? `${mainUrl}${props.image.src}`
            : `${siteUrl}/${site.siteMetadata.image}`;
    let canonicalLink;
    if (props.canonical) {
        canonicalLink = `${mainUrl}${props.canonical}`;
    } else {
        canonicalLink = site.siteMetadata.canonical;
    }
    const imgWidth = props.image?.width ? props.image.width : 875;
    const imgHeight = props.image?.height ? props.image.height : 554;
    pageUrl = `${siteUrl}/${path}`;
    pageUrl = pageUrl.replace(/^\/+/g, "");
    const rootUrl = siteUrl + props.rootPath;
    const prevLink =
        props.prevPage && props.prevPage !== null && rootUrl + props.prevPage;
    const nextLink =
        props.nextPage && props.nextPage !== null && rootUrl + props.nextPage;
    let siteTitle;
    if (props.pathname === "/") {
        siteTitle = `${site.siteMetadata.titleTemplate} By ${site.siteMetadata.title}`;
    } else {
        siteTitle = `${template} By ${metaTitle}`;
    }

    const basSchema = [
        {
            "@type": "Organization",
            "@id": `${siteUrl}/#organization`,
            name: `${siteTitle}`,
            url: siteUrl,
            logo: {
                "@type": "ImageObject",
                url: site.siteMetadata.logo,
            },
        },
        {
            "@type": "WebSite",
            "@id": `${siteUrl}/#website`,
            url: siteUrl,
            name: `${siteTitle}`,
            publisher: {
                "@id": `${siteUrl}/#organization`,
            },
            inLanguage: language,
            potentialAction: {
                "@type": "SearchAction",
                target: `${siteUrl}/?s={search_term_string}`,
                "query-input": "required name=search_term_string",
            },
        },
    ];

    const schemaOrgWebPage = {
        "@context": "http://schema.org",
        "@graph": [...basSchema],
    };

    return (
        <Helmet
            htmlAttributes={{
                lang: language,
            }}
        >
            {/* General tags */}
            <title>{siteTitle}</title>
            <meta name="description" content={metaDescription} />
            <meta name="image" content={bannerImage} />
            <link rel="canonical" href={canonicalLink} />
            <meta
                name="robots"
                content="index, follow, max-snippet:-1, max-video-preview:-1, max-image-preview:large"
            />
            {prevLink && <link rel="prev" href={prevLink} />}
            {nextLink && <link rel="next" href={nextLink} />}

            {/* OpenGraph tags */}
            <meta property="og:locale" content={language} />
            {props.isBlogPost ? (
                <meta property="og:type" content="article" />
            ) : null}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={canonicalLink} />
            <meta property="og:title" content={siteTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:image" content={bannerImage} />
            <meta property="og:image:secure_url" content={bannerImage} />
            <meta property="og:image:width" content={`${imgWidth}px`} />
            <meta property="og:image:height" content={`${imgHeight}px`} />
            <meta property="og:image:alt" content={siteTitle} />
            <meta property="og:image:type" content="image/png" />
        </Helmet>
    );
};

// SEO.defaultProps = {
//     lang: `en`,
//     description: ``,
//     pathname: "/",
// };

export default SEO;
