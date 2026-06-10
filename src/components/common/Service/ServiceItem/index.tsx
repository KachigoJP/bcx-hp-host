import React from "react";
import Link from "next/link";
import { StaticImageData } from "next/image";
import styles from "../Service.module.scss";

export interface ServiceItemProps {
  icon: string | StaticImageData;
  slug: string;
  title: string;
  description: string;
  handler?: React.MouseEventHandler<HTMLAnchorElement>;
}

const ServiceItem: React.FC<ServiceItemProps> = (props) => {
  return (
    <div className="col col-xl-4 col-lg-4 col-sm-6 col-12">
      <div className={styles["wpo-features-item"]}>
        <div className={styles["wpo-features-icon"]}>
          <div className="icon">
            <i className={`${props.icon}`}></i>
          </div>
        </div>
        <div className={styles["wpo-features-text"]}>
          <h2>
            <Link
              onClick={props.handler}
              href="/service/[slug]"
              as={`/service/${props.slug}`}
            >
              {props.title}
            </Link>
          </h2>
          <p>{props.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ServiceItem;
