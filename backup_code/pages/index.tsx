import * as React from "react";

import Layout from "@components/layout";
import SEO from "@components/common/seo";
import Hero from "@components/containers/home/hero";
import AboutArea from "@components/containers/home/about";
import FunfactArea from "@components/containers/home/funfact";
import CausesArea from "@components/containers/home/causes";
import DonateArea from "@components/containers/home/donate";
import EventArea from "@components/containers/home/events";
import TestimonialArea from "@components/containers/home/testimonial";
import SponsorsArea from "@components/containers/home/sponsors";

const IndexPage = () => {
    return (
        <Layout>
            <SEO title="Home" pathname="/" />
            <Hero />
            <AboutArea />
            <FunfactArea />
            <TestimonialArea />

            {/* <BlogArea /> */}
            {/* <CausesArea /> */}
            {/* <DonateArea /> */}
            <SponsorsArea />
        </Layout>
    );
};

export default IndexPage;
