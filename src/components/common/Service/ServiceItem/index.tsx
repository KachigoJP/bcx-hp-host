import React from "react";
import Image, { StaticImageData } from "next/image";
import styles from "../Service.module.scss";

export interface ServiceItemProps {
  icon: string;
  title: string;
  description: string;
  linkText: string;
  linkUrl: string;
  image?: string | StaticImageData;
  handler?: React.MouseEventHandler<HTMLAnchorElement>;
}

const ServiceItem: React.FC<ServiceItemProps> = (props) => {
  return (
    <div className="col col-xl-4 col-lg-4 col-sm-6 col-12">
      <div className={styles["wpo-service-item"]}>
        <div className={styles["wpo-service-image"]}>
          <Image src={props.image || "/images/default-service.jpg"} alt={props.title} width={430} height={320} />
          <div className={styles["wpo-service-icon"]}>
            <i className={props.icon}></i>
          </div>
        </div>
        <div className={styles["wpo-service-content"]}>
          <h3>{props.title}</h3>
          <p>{props.description}</p>
          <div className={styles["wpo-service-button"]}>
            <a href={props.linkUrl} className="theme-btn">
              {props.linkText}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceItem;
