import { pageService } from "@/lib/strapi/services";

export interface NavItem {
  label: string;
  url: string;
  slug: string;
  documentId: string;
}

/**
 * Generate navigation items from Strapi pages
 * Uses the page mapping for efficient lookup
 */
export async function getNavigationFromPages(): Promise<NavItem[]> {
  try {
    // Fetch page details for navigation
    const pagesResponse = await pageService.getAll({
      fields: ["title", "slug", "documentId", "url"],
      sort: ["createdAt:asc"], // Or any other sort order
      pagination: { pageSize: 100 },
      publicationState: "live",
      locale: "vi-VN",
    });

    // Create navigation items
    const navItems: NavItem[] = pagesResponse.data.map((page) => ({
      label: page.attributes.title,
      url: page.attributes.url || `/page/${page.attributes.slug}`,
      slug: page.attributes.slug,
      documentId: page.documentId,
    }));

    return navItems;
  } catch (error) {
    console.error("Error generating navigation:", error);
    return [];
  }
}

/**
 * Get navigation items filtered by specific slugs
 */
export async function getNavigationBySlug(
  slugs: string[]
): Promise<NavItem[]> {
  const allNavItems = await getNavigationFromPages();
  return allNavItems.filter((item) => slugs.includes(item.slug));
}

/**
 * Example: Main menu navigation
 */
export async function getMainNavigation(): Promise<NavItem[]> {
  // Specify which pages should appear in main navigation
  const mainPageSlugs = [
    "trang-chu",
    "about",
    "hoat-dong", // activities
    "tin-tuc", // news
    "lien-he", // contact
  ];

  return getNavigationBySlug(mainPageSlugs);
}

/**
 * Example: Footer navigation
 */
export async function getFooterNavigation(): Promise<{
  main: NavItem[];
  legal: NavItem[];
}> {
  const mainSlugs = ["about", "hoat-dong", "tin-tuc", "lien-he"];
  const legalSlugs = ["dieu-khoan", "chinh-sach", "bao-mat"]; // terms, policy, privacy

  const [main, legal] = await Promise.all([
    getNavigationBySlug(mainSlugs),
    getNavigationBySlug(legalSlugs),
  ]);

  return { main, legal };
}
