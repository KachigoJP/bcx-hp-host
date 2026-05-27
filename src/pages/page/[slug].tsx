import { GetStaticPaths, GetStaticProps } from "next";
import DynamicPage, { DynamicPageProps } from "@components/Page/DynamicPage";
import { getPageMapping, getDocumentIdBySlug } from "@/utils/pageMapping";
import { fetchPageByDocumentId } from "@/utils/pageData";
import { createLogger } from "@/utils/logger";

const logger = createLogger("Pages:Page:DynamicPage");

// Generate static paths using the page mapping
export const getStaticPaths: GetStaticPaths = async () => {
  logger.info("getStaticPaths started");

  try {
    // Get the slug-to-documentId mapping
    logger.debug("Fetching page mapping from Strapi");
    const pageMapping = await getPageMapping();

    logger.debug("Page mapping received", {
      pageCount: Object.keys(pageMapping).length,
    });

    const slugs = Object.keys(pageMapping);

    // Generate paths from the slugs
    const paths = slugs.map((slug) => ({
      params: { slug },
    }));

    logger.info("Static paths generated successfully", {
      pathCount: paths.length,
      slugs,
    });

    return {
      paths,
      fallback: "blocking", // Generate pages on-demand if not pre-rendered
    };
  } catch (error) {
    logger.error("Failed to generate static paths", error as Error);
    return {
      paths: [],
      fallback: "blocking",
    };
  }
};

// Fetch page data using documentId for better performance
export const getStaticProps: GetStaticProps<DynamicPageProps> = async ({
  params,
}) => {
  const slug = params?.slug as string;

  if (!slug) {
    return {
      notFound: true,
    };
  }

  try {
    // Get the page mapping to find documentId
    const pageMapping = await getPageMapping();
    const documentId = getDocumentIdBySlug(pageMapping, slug);

    if (!documentId) {
      logger.warn("No documentId found for slug", { slug });
      return {
        notFound: true,
      };
    }

    // Fetch page data by documentId using shared utility
    const result = await fetchPageByDocumentId(documentId, slug);

    if (!result.pageData) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        layout: result.layout,
        seo: result.seo,
        pageData: result.pageData,
      },
      revalidate: 60, // Revalidate every 60 seconds (ISR)
    };
  } catch (error) {
    logger.error("Failed to fetch page for SSG", error as Error, { slug });
    return {
      notFound: true,
    };
  }
};

export default DynamicPage;
