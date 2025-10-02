import { NextSeo } from "next-seo";
import React from "react";

// Source
import defaultProps from "../../../data/seo.json";
import { SEOProps } from "./interface";

const SEO: React.FC<SEOProps> = (props) => {
  const { metadata } = { ...defaultProps, ...props };

  const siteUrl = metadata.url?.replace(/\/$/, "");

  const prevLink =
    metadata.prev && metadata.prev !== null && siteUrl + metadata.prev;
  const nextLink =
    metadata.next && metadata.next !== null && siteUrl + metadata.next;

  return (
    <NextSeo
      title={metadata.title}
      description={metadata.description}
      canonical={metadata.canonical}
      openGraph={{
        type: metadata.og?.type,
        url: metadata.og?.url,
        title: metadata.og?.title,
        description: metadata.og?.description,
        images: metadata.og?.image ? [
          {
            url: metadata.og.image,
            width: metadata.og.img_width ? parseInt(metadata.og.img_width) : undefined,
            height: metadata.og.img_height ? parseInt(metadata.og.img_height) : undefined,
            alt: metadata.og.img_alt,
          },
        ] : [],
        locale: metadata.og?.ogLocale,
      }}
      robotsProps={{
        nosnippet: metadata.robots?.includes('nosnippet'),
        notranslate: metadata.robots?.includes('notranslate'),
        noimageindex: metadata.robots?.includes('noimageindex'),
        noarchive: metadata.robots?.includes('noarchive'),
        maxSnippet: metadata.robots?.includes('max-snippet') ? -1 : undefined,
        maxImagePreview: metadata.robots?.includes('max-image-preview') ? 'large' : undefined,
        maxVideoPreview: metadata.robots?.includes('max-video-preview') ? -1 : undefined,
      }}
      additionalLinkTags={[
        ...(prevLink ? [{ rel: 'prev', href: prevLink }] : []),
        ...(nextLink ? [{ rel: 'next', href: nextLink }] : []),
      ]}
    />
  );
};

export default SEO;
