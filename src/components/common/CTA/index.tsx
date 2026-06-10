import Link from "next/link";
import React from "react";
import Image from "next/image";
import styles from "./CTA.module.scss";

export interface CTAProps {
  image: string;
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

const CTA: React.FC<CTAProps> = ({ image, title, buttonText, buttonLink }) => {
  return (
    <section className={`${styles["wpo-cta-area"]} section-padding`}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className={styles["wpo-cta-section"]}>
              <div className={styles["wpo-cta-content"]}>
                <h2>{title}</h2>
                <Link href={buttonLink}>{buttonText}</Link>
              </div>
              <div className={styles["volunteer-img"]}>
                <Image src={image} alt="" width={365} height={512} />
              </div>
              <div className={styles["shape"]}>
                <Image
                  src="/images/cta-shape.png"
                  alt=""
                  width={100}
                  height={1000}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
