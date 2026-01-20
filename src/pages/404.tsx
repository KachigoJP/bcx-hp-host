import { globalService } from "@/lib/strapi/services";
// import { seoService } from "@/lib/strapi/services"; // SEO content type not created yet
// import { errorService } from "@/lib/strapi/services"; // Uncomment when error content type is created
import { convertGlobalInfoToLayoutData } from "@/utils/apps";
import { ErrorContent } from "@/utils/interfaces/error";
import { GlobalInfo } from "@/utils/interfaces/global";
import Error from "@components/containers/404";
import Layout from "@components/layout";
import SEO from "@components/layout/SEO";
import { SEOProps } from "@components/layout/SEO/interface";
import { getDefaultLayoutData } from "@utils/layoutData";
import React, { useEffect, useState } from "react";

// Default content for 404 page (fallback if Strapi is not available)
const defaultErrorContent: ErrorContent = {
  mainTitle: "Ôi! Bạn đã lạc đường rồi",
  subtitle: "Không tìm thấy trang",
  description:
    "Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển. Hãy quay về trang chủ hoặc khám phá các hoạt động thú vị của chúng tôi.",
  primaryButton: {
    text: "Về trang chủ",
    link: "/",
  },
  secondaryButton: {
    text: "Khám phá hoạt động",
    link: "/activity",
  },
  quickLinksTitle: "Hoặc thử các trang phổ biến:",
  quickLinks: [
    {
      title: "Về chúng tôi",
      link: "/about",
      icon: "ti-angle-right",
    },
    {
      title: "Hiking",
      link: "/hiking",
      icon: "ti-angle-right",
    },
    {
      title: "Camping",
      link: "/camping",
      icon: "ti-angle-right",
    },
    {
      title: "Workshop",
      link: "/workshop",
      icon: "ti-angle-right",
    },
    {
      title: "Liên hệ",
      link: "/contact",
      icon: "ti-angle-right",
    },
  ],
};

const defaultSeoData: SEOProps = {
  metadata: {
    page_code: "404",
    title: "404 - Không tìm thấy trang | Bàn Chân Xanh",
    description:
      "Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển. Quay về trang chủ để khám phá các hoạt động của Bàn Chân Xanh.",
  },
};

const Page404: React.FC = () => {
  const [globalData, setGlobalData] = useState<GlobalInfo | null>(null);
  const [error404Content] = useState<ErrorContent>(defaultErrorContent); // Static content (no CMS integration yet)
  const [seoData] = useState<SEOProps>(defaultSeoData); // Static SEO (no CMS integration yet)
  const layoutData = getDefaultLayoutData();

  useEffect(() => {
    const fetchGlobalData = async () => {
      try {
        const data = await globalService.get({
          populate: "*",
        });
        setGlobalData(data);
      } catch {
        console.log("Using default layout data");
      }
    };

    const fetchError404Content = async () => {
      // Skip API call - /api/error content type doesn't exist in Strapi yet
      // Using default content defined above
      // To enable CMS management, see: ERROR_CONTENT_TYPE_SETUP.md
      console.log("Using default 404 content (CMS content type not configured)");

      // To enable CMS management:
      // 1. Create 'error' content type in Strapi (see ERROR_CONTENT_TYPE_SETUP.md)
      // 2. Uncomment errorService import at top of file
      // 3. Add setError404Content to state declaration: const [error404Content, setError404Content] = ...
      // 4. Uncomment the code below:
      /*
      try {
        const content = await errorService.get();
        setError404Content(content);
      } catch (error) {
        console.log("Error fetching from CMS, using default content");
      }
      */
    };

    /* const fetchSeoData = async () => {
      try {
        const data = await seoService.get({
          populate: {
            "populate[pages][populate]": "*",
          },
        });
        setSeoData(data);
      } catch {
        console.log("Using default SEO data");
      }
    }; */

    fetchGlobalData();
    fetchError404Content();
    // fetchSeoData(); // Disabled - SEO content type not created
  }, []);

  return (
    <Layout data={globalData ? convertGlobalInfoToLayoutData(globalData) : layoutData.data}>
      <SEO {...seoData} />
      <Error content={error404Content} />
    </Layout>
  );
};

export default Page404;
