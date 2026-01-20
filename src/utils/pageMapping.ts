import { pageService } from "@/lib/strapi/services";

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
    const pagesResponse = await pageService.getAll({
      fields: ["slug", "documentId"],
      pagination: { pageSize: 100 }, // Adjust based on your total number of pages
      publicationState: "live",
      locale: "vi-VN",
    });

    // Create the mapping object
    const mapping: PageMapping = {};

    pagesResponse.data.forEach((page) => {
      const slug = page.attributes.slug;
      const documentId = page.attributes.documentId;

      if (slug && documentId) {
        mapping[slug] = documentId;
      }
    });

    return mapping;
  } catch (error) {
    console.error("Error fetching page mapping:", error);
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
