import React from "react";
import Slider from "react-slick";
import HeroItem, { HeroItemProps } from "@components/common/Hero/HeroItem";

export interface HeroProps {
  items: HeroItemProps[];
}

const Hero: React.FC<HeroProps> = (props) => {
  const settings = {
    dots: false,
    arrows: true,
    speed: 1200,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    fade: true,
  };

  return (
    <section className="wpo-hero-slider wpo-hero-section-6">
      <div className="hero-container">
        <div className="hero-wrapper">
          <Slider {...settings}>
            {props.items.map((item, index) => (
              <HeroItem
                key={index}
                backgroundImage={item.backgroundImage}
                title={item.title}
                subtitle={item.subtitle}
                link={item.link}
                text={item.text}
              />
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};
export default Hero;
