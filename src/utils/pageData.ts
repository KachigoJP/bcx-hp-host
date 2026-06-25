/**
 * Shared Page Data Utilities
 *
 * Functions for fetching and transforming Strapi page data
 * Used by both index.tsx and [slug].tsx to eliminate duplication
 */

import { pageService } from "@/lib/strapi/services";
import { PageContent } from "@/utils/interfaces";
import { getDefaultLayoutData } from "@/utils/layoutData";
import { SEOProps } from "@components/layout/SEO/interface";
import { LayoutProps } from "@components/layout";
import { createLogger } from "@/utils/logger";
import { getPageMapping, getDocumentIdBySlug } from "./pageMapping";

const logger = createLogger("Utils:PageData");

/**
 * Standard populate configuration for page data
 */
export const PAGE_POPULATE_CONFIG = {
  background: true,
  sections: {
    populate: {
      about: { populate: "*" },
      services: { populate: "*" },
      funfact: { populate: "*" },
      CTA: { populate: "*" },
      members: { populate: "*" },
      testimonials: { populate: "*" },
      partners: { populate: "*" },
    },
  },
  heros: {
    populate: {
      images: true,
      video: true,
    },
  },
  seo: {
    populate: {
      shareImage: true,
    },
  },
};

/**
 * Transform page SEO data to SEOProps format
 */
export function transformSEOData(
  pageData: PageContent | null,
  defaultTitle?: string,
): SEOProps {
  if (!pageData?.seo) {
    return {
      metadata: {
        title: defaultTitle || "Bàn Chân Xanh",
        description: pageData?.subtitle || "",
      },
    };
  }

  return {
    metadata: {
      title: pageData.seo.metaTitle,
      description: pageData.seo.metaDescription
    },
  };
}

/**
 * Fetch page data by slug
 * Returns layout, SEO, and page data
 */
export async function fetchPageBySlug(slug: string): Promise<{
  layout: LayoutProps;
  seo: SEOProps;
  pageData: PageContent | null;
  slug: string;
}> {
  const layout = getDefaultLayoutData();

  try {
    const pageResponse = await pageService.getBySlug(slug, {
      populate: PAGE_POPULATE_CONFIG,
      pagination: { pageSize: 1 },
      locale: "vi-VN",
      publicationState: "live",
    });
    const pageData = pageResponse.data || null;

    if (!pageData) {
      logger.warn("Page data not found", { slug });
      return {
        layout,
        seo: transformSEOData(null),
        pageData: null,
        slug,
      };
    }

    logger.info("Page data fetched successfully", {
      slug,
      title: pageData.title,
    });

    return {
      layout,
      seo: transformSEOData(pageData),
      pageData,
      slug,
    };
  } catch {
    logger.error("Page data fetched error");

    return {
      layout,
      seo: transformSEOData(null),
      pageData: null,
      slug,
    };
  }
}

/**
 * Fetch page data by documentId (more efficient for known IDs)
 * Returns layout, SEO, and page data
 */
export async function fetchPageByDocumentId(
  documentId: string,
  slug?: string,
): Promise<{
  layout: LayoutProps;
  seo: SEOProps;
  pageData: PageContent | null;
  slug?: string;
}> {
  logger.debug("Fetching page by documentId", { documentId, slug });

  const layout = getDefaultLayoutData();

  try {
    const pageResponse = await pageService.getById(documentId, {
      populate: PAGE_POPULATE_CONFIG,
    });

    const pageData = pageResponse.data || null;

    if (!pageData) {
      logger.warn("Page data not found", { documentId, slug });
      return {
        layout,
        seo: transformSEOData(null),
        pageData: null,
        slug,
      };
    }

    logger.info("Page data fetched successfully", {
      documentId,
      slug,
      title: pageData.title,
    });

    return {
      layout,
      seo: transformSEOData(pageData),
      pageData,
      slug: slug || pageData.slug,
    };
  } catch (error) {
    logger.error("Failed to fetch page by documentId", error as Error, {
      documentId,
      slug,
    });
    return {
      layout,
      seo: transformSEOData(null),
      pageData: null,
      slug,
    };
  }
}

/**
 * Fetch page data with optimized lookup (uses mapping for efficiency)
 * Returns layout, SEO, and page data
 */
export async function fetchPageOptimized(slug: string): Promise<{
  layout: LayoutProps;
  seo: SEOProps;
  pageData: PageContent | null;
  slug: string;
}> {
  logger.debug("Fetching page with optimized lookup", { slug });

  try {
    // Try to get documentId from mapping
    const pageMapping = await getPageMapping();
    const documentId = getDocumentIdBySlug(pageMapping, slug);

    if (documentId) {
      logger.debug("Found documentId in mapping, using direct fetch", {
        slug,
        documentId,
      });
      const result = await fetchPageByDocumentId(documentId, slug);
      // Ensure slug is always returned
      return {
        ...result,
        slug: result.slug || slug,
      };
    }

    // Fall back to slug-based fetch
    logger.debug("DocumentId not found in mapping, using slug fetch", { slug });
    return fetchPageBySlug(slug);
  } catch (error) {
    logger.error("Failed to fetch page optimized", error as Error, { slug });
    // Fall back to slug-based fetch
    return fetchPageBySlug(slug);
  }
}

/**
 * Fetch page data for Next.js getStaticProps
 * Returns props in the format expected by Next.js
 * Always returns props (never returns notFound) to show skeleton on error
 */
export async function getStaticPageProps(slug: string): Promise<{
  props: {
    layout: LayoutProps;
    seo: SEOProps;
    pageData: PageContent | null;
    slug: string;
  };
  revalidate: number;
}> {
  const result = await fetchPageBySlug(slug);

  // Always return props, even if pageData is null
  // DynamicPage component will show skeleton loader when pageData is null
  return {
    props: {
      layout: result.layout,
      seo: result.seo,
      pageData: result.pageData,
      slug, // Include slug for caching
    },
    revalidate: 60, // Revalidate every 60 seconds (ISR)
  };
}

const pageDataUtils = {
  fetchPageBySlug,
  fetchPageByDocumentId,
  fetchPageOptimized,
  transformSEOData,
  getStaticPageProps,
  PAGE_POPULATE_CONFIG,
};

export default pageDataUtils;
