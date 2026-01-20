import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import Layout, { LayoutProps } from "@components/layout";
import SEO from "@components/layout/SEO";
import { SEOProps } from "@components/layout/SEO/interface";
import { PageContent } from "@/utils/interfaces";
import { pageService } from "@/lib/strapi/services";
import { getDefaultLayoutData } from "@utils/layoutData";
import { getStrapiImageUrl } from "@utils/apps";
import { BlocksRenderer } from "@/components/RichText";

interface DynamicPageProps {
  layout: LayoutProps;
  seo: SEOProps;
  pageData: PageContent | null;
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

// Generate static paths from all pages in Strapi
export const getStaticPaths: GetStaticPaths = async () => {
  try {
    // Fetch all pages from Strapi
    const pagesResponse = await pageService.getAll({
      fields: ["slug", "documentId"],
      pagination: { pageSize: 100 }, // Adjust based on your needs
      publicationState: "live",
    });

    // Generate paths from the pages
    const paths = pagesResponse.data.map((page) => ({
      params: { slug: page.attributes.slug },
    }));

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

// Fetch page data based on slug
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
    // Fetch page data by slug
    const pageResponse = await pageService.getBySlug(slug, {
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
      pagination: { pageSize: 1 },
      locale: "vi-VN",
      publicationState: "live",
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

const DynamicPage: React.FC<DynamicPageProps> = ({ layout, seo, pageData }) => {
  if (!pageData) {
    return null;
  }

  return (
    <Layout data={layout.data}>
      <SEO {...seo} />

      <div className="container">
        <div className="page-content">
          <h1>{pageData.title}</h1>
          {pageData.subtitle && <p className="subtitle">{pageData.subtitle}</p>}

          {/* Render page sections dynamically based on your page structure */}
          {pageData.sections && (
            <div className="sections">
              {pageData.sections.map((section, index) => (
                <div key={index} className="section">
                  <h2>{section.title}</h2>
                  {section.description && <p>{section.description}</p>}
                  {/* Add more section rendering logic based on section.data_item */}
                </div>
              ))}
            </div>
          )}

          {/* Render content if available */}
          {pageData.content && (
            <BlocksRenderer content={pageData.content} className="page-body" />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default DynamicPage;
