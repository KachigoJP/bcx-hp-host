import React, { Fragment } from 'react';
import Layout from '@components/layout';
import Footer from '@components/layout/Footer'
import Hero from '@components/containers/Home/Hero';
import Partner from '@components/containers/Home/Partner';
import Blog from '@components/containers/Home/Blog';
import Service from '@components/containers/Home/Service';
import About from '@components/containers/Home/About';
import Team from '@components/containers/Home/Team';
import Project from '@components/containers/Home/Project';
import Testimonial from '@components/containers/Home/Testimonial';
import Event from '@components/containers/Home/Event';

const HomePage = () => {
  return (
    <Layout>
      <Hero />
      <About />
      <Service />
      <Team />
      <Project />
      <Testimonial />
      <Event />
      <Blog />
      <Partner tNone={'title-none'} />
    </Layout>
  )
};
export default HomePage;