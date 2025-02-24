import React, { Fragment } from 'react';
import Header from '@components/layout/Header';
import Footer from '@components/layout/Footer'
import Scrollbar from '@components/common/Scrollbar'
import Hero from '@components/containers/Hero';
import Partner from '@components/containers/Partner';
import Blog from '@components/containers/Blog';
import Service from '@components/containers/Service';
import About from '@components/containers/About';
import Team from '@components/containers/Team';
import Project from '@components/containers/Project';
import Testimonial from '@components/containers/Testimonial';
import Event from '@components/containers/Event';

const HomePage6 = () => {
  return (
    <Fragment>
      <Header logo='/images/logo2.png'/>
      <Hero />
      <About />
      <Service />
      <Team />
      <Project />
      <Testimonial />
      <Event />
      <Blog />
      <Partner tNone={'title-none'} />
      <Scrollbar />
      <Footer />
    </Fragment>
  )
};
export default HomePage6;