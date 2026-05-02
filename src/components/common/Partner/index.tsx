import Image from "next/image";
import React from "react";
import Slider from "react-slick";
export interface PartnerProps {
  title: string;
  subtitle: string;
  description: string;
  items: string[];
}

const PartnerSection: React.FC<PartnerProps> = (props) => {
  const settings = {
    dots: false,
    arrows: false,
    speed: 1000,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 3,
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
    <section className={`partners-section section-padding`}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="wpo-section-title">
              <span>{props.subtitle}</span>
              <h2>{props.title}</h2>
              <p>{props.description}</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col col-xs-12">
            <div className="partner-grids partners-slider owl-carousel">
              <Slider {...settings}>
                {props.items.map((item, key) => (
                  <div className="grid" key={key}>
                    <Image src={item} width={45} height={45} alt="" />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerSection;
