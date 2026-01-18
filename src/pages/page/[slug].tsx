import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import Layout, { LayoutProps } from "@components/layout";
import SEO from "@components/layout/SEO";
import { SEOProps } from "@components/layout/SEO/interface";
import { PageContent } from "@/utils/interfaces";
import { pageService } from "@/lib/strapi/services";
import { getDefaultLayoutData } from "@utils/layoutData";
import { getStrapiImageUrl } from "@utils/apps";
import { getPageMapping, getDocumentIdBySlug } from "@/utils/pageMapping";

interface DynamicPageProps {
  layout: LayoutProps;
  seo: SEOProps;
  pageData: PageContent | null;
  slug: string;
}

// Helper function to transform SEO data
const transformSEOData = (pageData: PageContent | null): SEOProps => {
  if (!pageData?.seo) {
    return {
      metadata: {
        title: pageData?.title || "Bàn Chân Xanh",
        description: pageData?.subtitle || "",
      },
    };
  }

  return {
    metadata: {
      title: pageData.seo.metaTitle,
      description: pageData.seo.metaDescription,
      image: pageData.seo.shareImage?.data
        ? getStrapiImageUrl(pageData.seo.shareImage.data.attributes.url || "")
        : undefined,
    },
  };
};

// Generate static paths using the page mapping
export const getStaticPaths: GetStaticPaths = async () => {
  try {
    // Get the slug-to-documentId mapping
    const pageMapping = await getPageMapping();
    const slugs = Object.keys(pageMapping);

    // Generate paths from the slugs
    const paths = slugs.map((slug) => ({
      params: { slug },
    }));

    console.log(`Generated ${paths.length} static paths for pages`);

    return {
      paths,
      fallback: "blocking", // Generate pages on-demand if not pre-rendered
    };
  } catch (error) {
    console.error("Error generating static paths:", error);
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
      console.log(`No documentId found for slug: ${slug}`);
      return {
        notFound: true,
      };
    }

    // Fetch page data by documentId (more efficient than by slug)
    const pageResponse = await pageService.getById(documentId, {
      populate: {
        background: true,
        sections: {
          populate: {
            about: { populate: "*" },
            services: { populate: "*" },
            funfact: { populate: "*" },
            CTA: { populate: "*" },
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
      },
    });

    const pageData = pageResponse.data?.attributes || null;

    if (!pageData) {
      return {
        notFound: true,
      };
    }

    const layoutData = getDefaultLayoutData();
    const seoData = transformSEOData(pageData);

    return {
      props: {
        layout: layoutData,
        seo: seoData,
        pageData,
        slug,
      },
      revalidate: 60, // Revalidate every 60 seconds (ISR)
    };
  } catch (error) {
    console.error(`Error fetching page with slug "${slug}":`, error);
    return {
      notFound: true,
    };
  }
};

const DynamicPage: React.FC<DynamicPageProps> = ({
  layout,
  seo,
  pageData,
  slug,
}) => {
  if (!pageData) {
    return null;
  }

  return (
    <Layout data={layout.data}>
      <SEO {...seo} />

      <div className="container">
        <div className="page-content">
          {/* Hero Section */}
          {pageData.heros && pageData.heros.length > 0 && (
            <div className="page-hero">
              {pageData.heros.map((hero, index) => (
                <div key={index} className="hero-item">
                  {hero.images?.data?.[0] && (
                    <img
                      src={getStrapiImageUrl(
                        hero.images.data[0].attributes.url || ""
                      )}
                      alt={hero.title}
                    />
                  )}
                  <h1>{hero.title}</h1>
                  {hero.subtitle && <p>{hero.subtitle}</p>}
                </div>
              ))}
            </div>
          )}

          {/* Page Title */}
          {(!pageData.heros || pageData.heros.length === 0) && (
            <div className="page-header">
              <h1>{pageData.title}</h1>
              {pageData.subtitle && (
                <p className="subtitle">{pageData.subtitle}</p>
              )}
            </div>
          )}

          {/* Page Sections */}
          {pageData.sections && pageData.sections.length > 0 && (
            <div className="sections">
              {pageData.sections.map((section, index) => (
                <div
                  key={index}
                  className="section"
                  data-type={section.data_item}
                >
                  {section.title && <h2>{section.title}</h2>}
                  {section.subtitle && <h3>{section.subtitle}</h3>}
                  {section.description && <p>{section.description}</p>}

                  {/* Render different section types */}
                  {section.data_item === "abouts" && section.about && (
                    <div className="about-section">
                      {/* Render about content */}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Page Content */}
          {pageData.content && (
            <div
              className="page-body"
              dangerouslySetInnerHTML={{ __html: pageData.content }}
            />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default DynamicPage;
