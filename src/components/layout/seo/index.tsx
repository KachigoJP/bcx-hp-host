import React from "react";
import { Helmet } from "react-helmet";

// Source
import { SEOProps } from "./interface";

const SEO: React.FC<SEOProps> = (props) => {
  const { metadata } = props;

  let pageUrl;
  const path = props.pathname.replace(/^\/|\/$/g, "");

  const metaDescription = metadata.description;
  const language = metadata.lang;
  const siteUrl = metadata.siteUrl.replace(/\/$/, "");
  const bannerImage = `${siteUrl}/${metadata.bannerImage?.src}`;

  let canonicalLink;
  if (metadata.canonical) {
    canonicalLink = `${siteUrl}${metadata.canonical}`;
  }
  const imgWidth = metadata.bannerImage?.width
    ? metadata.bannerImage.width
    : 875;
  const imgHeight = metadata.bannerImage?.height
    ? metadata.bannerImage.height
    : 554;

  pageUrl = `${siteUrl}/${path}`;
  pageUrl = pageUrl.replace(/^\/+/g, "");

  const prevLink =
    metadata.prevPage &&
    metadata.prevPage !== null &&
    siteUrl + metadata.prevPage;
  const nextLink =
    metadata.nextPage &&
    metadata.nextPage !== null &&
    siteUrl + metadata.nextPage;

  let siteTitle;
  if (props.pathname === "/") {
    siteTitle = `${metadata.site_title} By ${metadata.title}`;
  }

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
      {metadata.isBlogPost ? (
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

export default SEO;
