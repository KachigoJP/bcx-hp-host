import { pageService } from "@/lib/strapi/services";
import { createLogger } from "@/utils/logger";

const logger = createLogger("Utils:PageMapping");

/**
 * Page mapping type: slug -> documentId
 * Example: { "trang-chu": "zpqsb7nwluiskl69m1v3k53z", "about": "abc123..." }
 */
export type PageMapping = Record<string, string>;

/**
 * Fetches all pages from Strapi and creates a slug-to-documentId mapping
 * This is useful for efficient lookups and generating static paths
 */
export async function getPageMapping(): Promise<PageMapping> {
  try {
    logger.debug("Fetching page mapping from Strapi");

    const pagesResponse = await pageService.getAll({
      fields: ["slug"],
      pagination: { pageSize: 100 }, // Adjust based on your total number of pages
      publicationState: "live",
      locale: "vi-VN",
    });

    logger.debug("Pages response received", {
      pageCount: pagesResponse.data?.length,
      firstPage: pagesResponse.data?.[0],
    });

    // Create the mapping object
    const mapping: PageMapping = {};

    if (!pagesResponse.data || !Array.isArray(pagesResponse.data)) {
      logger.warn("No pages data received from Strapi");
      return mapping;
    }

    pagesResponse.data.forEach((page) => {
      // In Strapi v5, documentId is at the root level, slug is in attributes
      const slug = page.attributes?.slug;
      const documentId = page.documentId; // documentId is at root level, not in attributes

      if (slug && documentId) {
        mapping[slug] = documentId;
        logger.debug("Added page to mapping", { slug, documentId });
      } else {
        logger.warn("Page missing slug or documentId", {
          hasSlug: !!slug,
          hasDocumentId: !!documentId,
          page,
        });
      }
    });

    logger.info("Page mapping created successfully", {
      pageCount: Object.keys(mapping).length,
      slugs: Object.keys(mapping),
    });

    return mapping;
  } catch (error) {
    logger.error("Error fetching page mapping", error as Error);
    return {};
  }
}

/**
 * Get documentId by slug from the mapping
 */
export function getDocumentIdBySlug(
  mapping: PageMapping,
  slug: string
): string | undefined {
  return mapping[slug];
}

/**
 * Get all available slugs from the mapping
 */
export function getAllSlugs(mapping: PageMapping): string[] {
  return Object.keys(mapping);
}

/**
 * Check if a slug exists in the mapping
 */
export function slugExists(mapping: PageMapping, slug: string): boolean {
  return slug in mapping;
}
