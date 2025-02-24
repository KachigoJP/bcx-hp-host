import React, { Fragment } from 'react';
import Header from '../components/layout/header';
import Hero6 from '../components/containers/hero6';
import Service5 from '../components/containers/Service5';
import AboutS4 from '../components/containers/AboutS4';
import Footer from '../components/layout/footer'
import Scrollbar from '../components/containers/scrollbar'
import Logo from '/public/images/logo2.png'
import PartnerSection from '../components/containers/PartnerSection';
import TeamSection3 from '../components/containers/TeamSection3';
import BlogSection5 from '../components/containers/BlogSection5';
import abimg from '/public/images/about6.jpg'
import ProjectSection4 from '../components/containers/ProjectSection4';
import Testimonial2 from '../components/containers/Testimonial2';
import EventSection4 from '../components/containers/EventSection4';

const HomePage6 = () => {
  return (
    <Fragment>
      <Header logo='/images/logo2.png' hclass='wpo-header-style-4' />
      <Hero6 heroClass={'wpo-hero-section-6'} />
      <AboutS4 abClass={'wpo-about-section-s6'} abImg={abimg} Atitle={'We are Protecting Wildlife With All Our Dedication.'} />
      <Service5 />
      <TeamSection3 />
      <ProjectSection4 />
      <Testimonial2 tClass={'wpo-testimonial-area-s3 pt-0'} />
      <EventSection4 />
      <BlogSection5 />
      <PartnerSection tNone={'title-none'} />
      <Scrollbar />
      <Footer />
    </Fragment>
  )
};
export default HomePage6;