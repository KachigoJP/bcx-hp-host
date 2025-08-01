import React, { Fragment } from "react";

// Source
import Layout, { LayoutProps } from "@components/layout";
import SEO from "@components/layout/SEO";
import Hero, { HeroProps } from "@components/containers/Home/Hero";
import Partner, { PartnerProps } from "@components/containers/Home/Partner";
import Service, { ServiceProps } from "@components/containers/Home/Service";
import About, { AboutProps } from "@components/containers/Home/About";
import Team, { TeamProps } from "@components/containers/Home/Team";
import Project, { ProjectProps } from "@components/containers/Home/Project";
import Testimonial, {
  TestimonialProps,
} from "@components/containers/Home/Testimonial";
import Blog from "@components/containers/Home/Blog";
import Event from "@components/containers/Home/Event";

// Data
import Services from "@api/service";
import TeamsData from "@api/team";
import ProjectsData from "@api/projects";
import { SEOProps } from "@components/layout/SEO/interface";

interface HomeProps {
  layout: LayoutProps;
  seo: SEOProps;
  about: AboutProps;
  hero: HeroProps;
  services: ServiceProps;
  teams: TeamProps;
  projects: ProjectProps;
  testimonials: TestimonialProps;
  partner: PartnerProps;
}

export const getServerSideProps = async () => {
  const webSiteInfo = {
    title: "Ban Chan Xanh",
    description: "Ban Chan Xanh",
  };
  const aboutData: AboutProps = {
    totalRaised: 25000,
    about: {
      title: "We Can Save More Lifes With Your Helping Hand.",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.",
      points: [
        "The standard chunk of Lorem Ipsum used since.",
        "Randomised words which don't look even slightly believable.",
        "Making this the first true generator on the Internet.",
      ],
      linkText: "More About",
      linkHref: "/about",
    },
    image: "/assets/images/default/about.png",
    totalNeed: 1000000,
  };

  const heroData: HeroProps = {
    items: [
      {
        backgroundImage: "/images/slider/slide-3.jpg",
        title: "Green is for hope just as gray is for death.",
        subtitle:
          "We help local nonprofits access the funding, and support they need to become more.",
        link: "/about",
        text: "Get Started",
      },
      {
        backgroundImage: "/images/slider/slide-5.jpg",
        title: "Green is for hope just as gray is for death.",
        subtitle:
          "We help local nonprofits access the funding, and support they need to become more.",
        link: "/about",
        text: "Get Started",
      },
      {
        backgroundImage: "/images/slider/slide-6.jpg",
        title: "Green is for hope just as gray is for death.",
        subtitle:
          "We help local nonprofits access the funding, and support they need to become more.",
        link: "/about",
        text: "Get Started",
      },
    ],
  };

  const serviceData: ServiceProps = {
    title: "Our Services",
    subtitle: "What We Do",
    description:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, ",
    services: Services,
  };

  const teamData = {
    title: "Meet Our Volunteer Team",
    subtitle: "Expert Team",
    description:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form,",
    items: TeamsData,
  };

  const projectData = {
    items: ProjectsData,
  };

  const testimonialsData = {
    title: "What People Say About Us",
    subtitle: "Testimonial",
    description:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form",
    items: [
      {
        image: "/images/testimonial/img-1.jpg",
        description:
          "Lorem ipsum dolor sit amet, consectetur adiping elit,  do eiusmod tempor incididunt ut labore et doliore magna aliqjtua. Quis ipsum suspendisse ultrices gravida. Risus commodo maepac cenas.",
        title: "Harverd Tommy",
        subtitle: "Maneger Of MNTR",
      },
      {
        image: "/images/testimonial/img-1.jpg",
        description:
          "Lorem ipsum dolor sit amet, consectetur adiping elit,  do eiusmod tempor incididunt ut labore et doliore magna aliqjtua. Quis ipsum suspendisse ultrices gravida. Risus commodo maepac cenas.",
        title: "Marry Jenefer",
        subtitle: "CEO Of Golden Bravo",
      },
      {
        image: "/images/testimonial/img-1.jpg",
        description:
          "Lorem ipsum dolor sit amet, consectetur adiping elit,  do eiusmod tempor incididunt ut labore et doliore magna aliqjtua. Quis ipsum suspendisse ultrices gravida. Risus commodo maepac cenas.",
        title: "William Robert",
        subtitle: "CEO Of Bexima",
      },
    ],
  };

  const partnerData = {
    title: "Our Partners & Donors",
    subtitle: "Who help us",
    description:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.",
    items: [
      "/assets/images/default/partner.jpg",
      "/assets/images/default/partner.jpg",
      "/assets/images/default/partner.jpg",
      "/assets/images/default/partner.jpg",
      "/assets/images/default/partner.jpg",
      "/assets/images/default/partner.jpg",
    ],
  };

  const seoData = {
    metadata: {
      title: "Ban Chan Xanh",
    },
  };

  const headerMenus = [
    {
      id: 1,
      title: "Home",
      link: "/home",
    },
    {
      id: 4,
      title: "Event",
      link: "/event",
      submenu: [
        {
          id: 41,
          title: "Hiking",
          link: "/hiking",
        },
        {
          id: 42,
          title: "Camping",
          link: "/camping",
        },
        {
          id: 43,
          title: "Workshop",
          link: "/workshop",
        },
      ],
    },

    {
      id: 3,
      title: "Pages",
      link: "/",
      submenu: [
        {
          id: 31,
          title: "Term & Condition",
          link: "/terms",
        },
        {
          id: 32,
          title: "Privacy Policy",
          link: "/policy",
        },
      ],
    },
    {
      id: 5,
      title: "Blog",
      link: "/blog",
    },
    {
      id: 88,
      title: "Contact",
      link: "/contact",
    },
  ];

  const footerMenus = [
    {
      id: 1,
      title: "Blogs",
      link: "/blogs",
    },
    {
      id: 2,
      title: "Latest News",
      link: "/news",
    },
    {
      id: 3,
      title: "Events",
      link: "/events",
    },
    {
      id: 4,
      title: "About Us",
      link: "/about",
    },
    {
      id: 5,
      title: "Contact Us",
      link: "/contact",
    },
  ];

  const quickLinks = [
    {
      id: 1,
      title: "Term & Condition",
      link: "/term",
    },
    {
      id: 2,
      title: "Privacy Policy",
      link: "/policy",
    },
  ];

  const layoutData = {
    data: {
      logo: "/assets/images/logo.png",
      slogan: "",
      footerSlogan:
        "Welcome and open yourself to your truest love this year with us! With the Release Process",
      facebook: "",
      instagram: "",
      google: "",
      email: "thongbao@banchanxanh.com",
      phone: "(+081) 080-5988-2754",
      headerHenu: headerMenus,
      footerQuicklinks: quickLinks,
      footerMenu: footerMenus,
    },
  };

  return {
    props: {
      layout: layoutData,
      seo: seoData,
      info: webSiteInfo,
      about: aboutData,
      hero: heroData,
      services: serviceData,
      teams: teamData,
      projects: projectData,
      testimonials: testimonialsData,
      partner: partnerData,
    },
  };
};

const HomePage: React.FC<HomeProps> = (props) => {
  return (
    <Layout data={props.layout.data}>
      <SEO {...props.seo} />
      <Hero {...props.hero} />
      <About {...props.about} />
      <Service {...props.services} />
      <Team {...props.teams} />
      <Project {...props.projects} />
      <Testimonial {...props.testimonials} />
      {/* <Event />
      <Blog /> */}
      <Partner {...props.partner} />
    </Layout>
  );
};
export default HomePage;
