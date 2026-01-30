import React from "react";
import Layout, { LayoutProps } from "@components/layout";
import SEO from "@components/layout/SEO";
import { SEOProps } from "@components/layout/SEO/interface";
import { PageContent } from "@/utils/interfaces";
import { BlocksRenderer } from "@/components/RichText";
import Hero from "@components/containers/Home/Hero";
import {
  transformHeroData,
  renderSection,
  getSortedSections,
} from "@/utils/pageRenderer";

export interface DynamicPageProps {
  layout: LayoutProps;
  seo: SEOProps;
  pageData: PageContent | null;
}

/**
 * Shared dynamic page component used by both index.tsx and [slug].tsx
 * Renders hero, sections, and content dynamically from Strapi data
 */
const DynamicPage: React.FC<DynamicPageProps> = ({ layout, seo, pageData }) => {
  if (!pageData) {
    return null;
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
