import React from "react";
import { Helmet } from "react-helmet";

// Source
import { SEOProps } from "./interface";

const SEO: React.FC<SEOProps> = (props) => {
  const { metadata } = props;

  const siteUrl = metadata.url?.replace(/\/$/, "");

  const prevLink =
    metadata.prev &&
    metadata.prev !== null &&
    siteUrl + metadata.prev;
  const nextLink =
    metadata.next &&
    metadata.next !== null &&
    siteUrl + metadata.next;

  return (
    <Helmet
      htmlAttributes={{
        lang: metadata.lang,
      }}
    >
      {/* General tags */}
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      <meta name="image" content={metadata.image} />
      <link rel="canonical" href={metadata.canonical} />
      <meta name="robots" content={metadata.robots} />
      {prevLink && <link rel="prev" href={prevLink} />}
      {nextLink && <link rel="next" href={nextLink} />}

      {/* OpenGraph tags */}
      <meta property="og:locale" content={metadata.lang} />
      <meta property="og:type" content={metadata.og?.type} />
      <meta property="og:url" content={metadata.og?.url} />
      <meta property="og:title" content={metadata.og?.title} />
      <meta property="og:description" content={metadata.og?.description} />
      <meta property="og:image" content={metadata.og?.image} />
      <meta property="og:image:secure_url" content={metadata.og?.secure_url} />
      <meta property="og:image:width" content={metadata.og?.img_width} />
      <meta property="og:image:height" content={metadata.og?.img_height} />
      <meta property="og:image:alt" content={metadata.og?.img_alt} />
    </Helmet>
  );
};

export default SEO;
