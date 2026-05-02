import Link from "next/link";
import React from "react";
import styles from "./CTA.module.scss";

export interface CTAProps {
  backgroundImage: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
}

const CTA: React.FC<CTAProps> = ({
  backgroundImage,
  title,
  subtitle,
  buttonText,
  buttonLink,
}) => {
  const clickHandler = () => {
    window.scrollTo(10, 0);
  };

  return (
    <section
      className={`${styles["wpo-cta-section"]} section-padding`}
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className={styles["wpo-cta-content"]}>
              <h2>{title}</h2>
              <p>{subtitle}</p>
              <Link
                onClick={clickHandler}
                className={styles["theme-btn"]}
                href={buttonLink}
              >
                {buttonText}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
