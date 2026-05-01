import React, { useEffect } from "react";
import Layout, { LayoutProps } from "@components/layout";
import SEO from "@components/layout/SEO";
import { SEOProps } from "@components/layout/SEO/interface";
import { PageContent } from "@/utils/interfaces";
import { BlocksRenderer } from "@/components/RichText";
import Hero from "@components/common/Hero";
import {
  transformHeroData,
  renderSection,
  getSortedSections,
} from "@/utils/pageRenderer";
import PageSkeleton from "./PageSkeleton";
import { savePage } from "@/utils/pageCache";

export interface DynamicPageProps {
  layout: LayoutProps;
  seo: SEOProps;
  pageData: PageContent | null;
  slug?: string;
}

/**
 * Shared dynamic page component used by both index.tsx and [slug].tsx
 * Renders hero, sections, and content dynamically from Strapi data
 * Shows skeleton loader when pageData is unavailable
 * Caches successful page loads for offline viewing
 */
const DynamicPage: React.FC<DynamicPageProps> = ({
  layout,
  seo,
  pageData,
  slug,
}) => {
  // Cache page data when successfully loaded and clear retry count
  useEffect(() => {
    if (pageData && slug) {
      savePage(slug, pageData);

      // Clear retry count from sessionStorage on successful load
      try {
        const retryKey = `retry_count_${slug}`;
        sessionStorage.removeItem(retryKey);
      } catch (e) {
        console.error("Failed to clear retry count", e);
      }
    }
  }, [pageData, slug]);

  // Show skeleton loader if page data is unavailable
  if (!pageData) {
    return (
      <Layout data={layout.data}>
        <SEO {...seo} />
        <PageSkeleton slug={slug} />
      </Layout>
    );
  }

  // Transform hero data
  const heroData = transformHeroData(pageData);

  // Get sorted sections
  const sortedSections = getSortedSections(pageData);

  return (
    <Layout data={layout.data}>
      <SEO {...seo} />

      {/* Render Hero Section if available */}
      {heroData && <Hero {...heroData} />}

      {/* Render dynamic sections based on data_item type */}
      {sortedSections.map((section, index) => renderSection(section, index))}

      {/* Render additional content if available */}
      {pageData.content && (
        <div className="container">
          <div className="page-content">
            <BlocksRenderer content={pageData.content} className="page-body" />
          </div>
        </div>
      )}
    </Layout>
  );
};

export default DynamicPage;
