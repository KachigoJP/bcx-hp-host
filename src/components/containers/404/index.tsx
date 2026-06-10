import { ErrorContent } from "@/utils/interfaces/error";
import Link from "next/link";
import React from "react";

export interface ErrorProps {
  content: ErrorContent;
}

const Error: React.FC<ErrorProps> = ({ content }) => {
  const ClickHandler = () => {
    window.scrollTo(0, 0);
  };

  return (
    <section className="error-404-section section-padding">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10 col-12">
            <div className="error-404-content text-center">
              {/* Animated 404 Number */}
              <div className="error-404-number">
                <div className="error-digit">
                  <span className="digit-char">4</span>
                  <i className="fi flaticon-forest"></i>
                </div>
                <div className="error-digit">
                  <span className="digit-char">0</span>
                  <i className="fi flaticon-placeholder"></i>
                </div>
                <div className="error-digit">
                  <span className="digit-char">4</span>
                  <i className="fi flaticon-forest"></i>
                </div>
              </div>

              {/* Error Message */}
              <div className="error-404-message">
                <h2>{content.mainTitle}</h2>
                <p>{content.description}</p>
              </div>

              {/* Action Buttons */}
              <div className="error-404-actions">
                <Link
                  onClick={ClickHandler}
                  href={content.primaryButton.link}
                  className="theme-btn"
                >
                  <i className="fi flaticon-checked"></i>
                  {content.primaryButton.text}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Error;
