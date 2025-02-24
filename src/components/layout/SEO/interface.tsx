export interface SEOProps {
  metadata: SEOMetadata;
}

export interface SEOMetadata {
  url?: string;
  title: string;
  description?: string;
  canonical?: string;
  robots?: string;
  lang?: string;
  favicon: string;
  keywords: string;
  image?: string;
  prev?: string;
  next?: string;
  og?: OpenGraph;
  isBlogPost?: boolean;
}

export interface OpenGraph {
  url?: string;
  title?: string;
  description?: string;
  type?: string;
  locale?: string;
  image?: string;
  secure_url?: string
  img_width?: string;
  img_height?: string;
  img_alt?: string
}
