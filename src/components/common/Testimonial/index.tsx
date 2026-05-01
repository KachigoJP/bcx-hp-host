import React from "react";
import Slider from "react-slick";
import { StaticImageData } from "next/image";
import TestimonialItem from "@components/common/Testimonial/TestimonialItem";

export interface TestimonialItem {
  image: string | StaticImageData;
  title: string;
  subtitle: string;
  description: string;
}

export interface TestimonialProps {
  title: string;
  subtitle: string;
  description: string;
  items: TestimonialItem[];
}

const TestimonialSection: React.FC<TestimonialProps> = ({
  title,
  subtitle,
  description,
  items,
}) => {
  const settings = {
    dots: false,
    arrows: true,
    speed: 1000,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="wpo-testimonial-area section-padding">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="wpo-section-title">
              <span>{subtitle}</span>
              <h2>{title}</h2>
              <p>{description}</p>
            </div>
          </div>
        </div>
        <div className="wpo-testimonial-wrap">
          <div className="testimonial-slider owl-carousel">
            <Slider {...settings}>
              {items.map((item, idx) => (
                <TestimonialItem
                  key={idx}
                  image={item.image}
                  description={item.description}
                  title={item.title}
                  subtitle={item.subtitle}
                />
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;
