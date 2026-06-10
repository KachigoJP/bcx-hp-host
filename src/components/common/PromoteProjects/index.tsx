import React from "react";
import Link from "next/link";
import Image from "next/image";
import * as RichText from "@components/common/BlocksRenderer";
import { StrapiRichText } from "@/utils/interfaces/strapi_blocks";
import DEFAULT_IMAGES from "@utils/images"; // Adjust the import path as needed

export interface AboutProps {
  title: string;
  subTitle?: string;
  description?: string;
  image?: string;
  about: {
    linkText: string;
    linkHref: string;
    content?: StrapiRichText;
    totalRaised?: number;
    totalNeed?: number;
  };
}

const AboutSection: React.FC<AboutProps> = (props) => {
  const { about, image } = props;
  const ClickHandler = () => {
    window.scrollTo(10, 0);
  };

  return (
    <section className="wpo-about-section style-s2 section-padding">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 col-md-12 col-12">
            <div className="wpo-about-wrap">
              <div className="wpo-about-img">
                <Image
                  src={image || DEFAULT_IMAGES.SKELETON_500_670}
                  width={581}
                  height={670}
                  alt=""
                />
                {about.totalRaised && about.totalNeed ? (
                  <div className="wpo-total-raised">
                    <div className="wpo-total-raised-wrap">
                      <div className="wpo-total-raised-icon">
                        <i className="fi flaticon-wallet-filled-money-tool"></i>
                      </div>
                      <div className="wpo-total-raised-text">
                        <ul>
                          <li>
                            Total Raised
                            <span>${about.totalRaised.toString()}</span>
                          </li>
                        </ul>
                        <div className="progress-section">
                          <div className="process">
                            <div className="progress">
                              <div
                                className="progress-bar"
                                style={{
                                  width: `${((about.totalRaised / about.totalNeed) * 100).toString()}%`,
                                }}
                              >
                                <div className="progress-value"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}

                <div className="round-ball-1"></div>
                <div className="round-ball-2"></div>
                <div className="round-ball-3"></div>
                <div className="round-ball-4"></div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-12 col-12">
            <div className="wpo-about-text">
              <span>{props.subTitle}</span>
              <h2>{props.title}</h2>
              <p>{props.description}</p>
              {about ? (
                <>
                  {about.content ? (
                    <RichText.BlocksRenderer content={about.content} />
                  ) : null}
                  <Link
                    onClick={ClickHandler}
                    className="theme-btn-s2"
                    href={about.linkHref}
                  >
                    {about.linkText}
                  </Link>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
