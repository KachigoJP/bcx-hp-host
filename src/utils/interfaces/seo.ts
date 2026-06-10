/**
 * SEO related interfaces and types
 */

export interface SEOContent {
  metadata: {
    page_code: string;
    url: string;
    title: string;
    description: string;
    canonical: string;
    robots: string;
    lang: string;
    favicon: string;
    keywords: string;
    image: string;
    prev: string;
    next: string;
    og: {
      url?: string;
      title?: string;
      description?: string;
      type?: string;
      ogLocale?: string;
      image?: string;
      secure_url?: string;
      img_width?: string;
      img_height?: string;
      img_alt?: string;
    };
  };
}
