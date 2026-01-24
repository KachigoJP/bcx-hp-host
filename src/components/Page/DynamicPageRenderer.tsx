/**
 * Dynamic Page Renderer
 *
 * Shared component for rendering Strapi page content
 * Used by both index.tsx (homepage) and [slug].tsx (dynamic pages)
 */

import React from "react";
import Layout, { LayoutProps } from "@components/layout";
import SEO from "@components/layout/SEO";
import { SEOProps } from "@components/layout/SEO/interface";
import { PageContent } from "@/utils/interfaces";
import { getStrapiImageUrl } from "@utils/apps";
import { BlocksRenderer } from "@/components/RichText";

export interface DynamicPageProps {
  layout: LayoutProps;
  seo: SEOProps;
  pageData: PageContent | null;
  slug?: string;
}

/**
 * Renders a dynamic page with Strapi content
 * Handles hero sections, page content, and sections
 */
export const DynamicPageRenderer: React.FC<DynamicPageProps> = ({
  layout,
  seo,
  pageData,
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

          {/* Page Title (if no hero) */}
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

          {/* Page Content (Rich Text) */}
          {pageData.content && (
            <BlocksRenderer content={pageData.content} className="page-body" />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default DynamicPageRenderer;
