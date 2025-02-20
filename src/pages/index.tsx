import * as React from "react";
import { GetServerSideProps } from "next";

import Layout from "@components/layout";
import SEO from "@components/layout/seo";
import { SEOMetadata } from "@interfaces/index";
import Hero from "@components/containers/home/hero";
// import AboutArea from "@components/containers/home/about";
// import FunfactArea from "@components/containers/home/funfact";
// import CausesArea from "@components/containers/home/causes";
// import DonateArea from "@components/containers/home/donate";
// import EventArea from "@components/containers/home/events";
// import TestimonialArea from "@components/containers/home/testimonial";
// import SponsorsArea from "@components/containers/home/sponsors";

export const getServerSideProps: GetServerSideProps = async () => {
  // DEFAULT Value
  const metadata: SEOMetadata = {
    title: "Ban Chan Xanh",
    description:
      "Non Profit Best Gatsby and react Templates are available on this website.",
    canonical: "https://banchanxanh.com",
    robots: "index, follow, max-snippet:-1, max-video-preview:-1, max-image-preview:large",
    lang: "vi",
    favicon: "https://banchanxanh.com/assets/vi",
    keywords: "",
    og: {
      title: "Ban Chan Xanh - Non Profit Website",
      description: "Ban Chan Xanh - Non Profit Website",
      type: 'website',
    }
  };

  return {
    props: {
      metadata,
    },
  };
};

interface Props {
  metadata: SEOMetadata
}

const IndexPage: React.FC<Props> = (props) => {

  return (
    <Layout>
      <SEO metadata={props.metadata} />
      <Hero />
      {/* <AboutArea />
      <FunfactArea />
      <TestimonialArea /> */}

      {/* <BlogArea /> */}
      {/* <CausesArea /> */}
      {/* <DonateArea /> */}
      {/* <SponsorsArea /> */}
    </Layout>
  );
};

export default IndexPage;
