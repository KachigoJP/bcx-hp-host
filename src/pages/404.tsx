import { ErrorContent } from "@/utils/interfaces/error";
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
};

const Page404: React.FC = () => {
  const [error404Content] = useState<ErrorContent>(defaultErrorContent);

  useEffect(() => {}, []);

  return <Error content={error404Content} />;
};

export default Page404;
