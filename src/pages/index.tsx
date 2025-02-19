import * as React from "react";
import { GetServerSideProps } from "next";
import { getSession, signIn } from "next-auth/react";

import Layout from "@components/layout";
import SEO from "@components/layout/seo";
import { SEOMetadata } from "@interfaces/index";
// import Hero from "@components/containers/home/hero";
// import AboutArea from "@components/containers/home/about";
// import FunfactArea from "@components/containers/home/funfact";
// import CausesArea from "@components/containers/home/causes";
// import DonateArea from "@components/containers/home/donate";
// import EventArea from "@components/containers/home/events";
// import TestimonialArea from "@components/containers/home/testimonial";
// import SponsorsArea from "@components/containers/home/sponsors";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session) {
    const result = await signIn("keycloak-client-credentials"); // Trigger the authorize function
    if (result?.error) {
      console.error("Login failed:", result.error);
    } else {
      console.log("Login successful!");
    }
  }
  console.log("getServerSideProps sessions", session);

  return {
    props: {},
  };
};

const IndexPage = () => {
  const metadata: SEOMetadata = {
    title: "Ban Chan Xanh",
    site_title: "Ban Chan Xanh - Non Profit Website",
    description:
      "Non Profit Best Gatsby and react Templates are available on this website.",
    bannerImage: undefined,
    siteUrl: "https://banchanxanh.com",
    canonical: "",
  };
  return (
    <Layout>
      <SEO pathname="/" metadata={metadata} />
      {/* <Hero />
            <AboutArea />
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
