import ServiceItem, { ServiceItemProps } from "@components/common/ServiceItem";
import React from "react";

export interface ServiceProps {
  title: string;
  subtitle: string;
  description: string;
  services: ServiceItemProps[];
}

const ServiceSection: React.FC<ServiceProps> = ({
  services,
  title,
  subtitle,
  description,
}) => {
  const clickHandler = () => {
    window.scrollTo(10, 0);
  };

  return (
    <section className="wpo-features-section-s6 section-padding">
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
        <div className="row">
          {services.slice(0, 3).map((service, index) => (
            <ServiceItem key={index} {...service} handler={clickHandler} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
