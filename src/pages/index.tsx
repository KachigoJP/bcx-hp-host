import { GetStaticProps } from "next";
import DynamicPage, { DynamicPageProps } from "@components/Page/DynamicPage";
import { getStaticPageProps } from "@/utils/pageData";

// Fetch page data for "trang-chu" slug at root path
export const getStaticProps: GetStaticProps<DynamicPageProps> = async () => {
  return getStaticPageProps("trang-chu");
};

export default DynamicPage;
