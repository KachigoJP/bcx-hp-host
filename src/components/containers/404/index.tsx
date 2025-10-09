import { ErrorContent } from '@/utils/interfaces/error';
import Link from 'next/link';
import React from 'react';

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
                                <Link onClick={ClickHandler} href={content.primaryButton.link} className="theme-btn">
                                    <i className="fi flaticon-checked"></i>
                                    {content.primaryButton.text}
                                </Link>
                                <Link onClick={ClickHandler} href={content.secondaryButton.link} className="theme-btn-outline">
                                    <i className="fi flaticon-forest"></i>
                                    {content.secondaryButton.text}
                                </Link>
                            </div>

                            {/* Quick Links */}
                            {content.quickLinks && content.quickLinks.length > 0 && (
                                <div className="error-404-quick-links">
                                    <p className="quick-links-title">{content.quickLinksTitle}</p>
                                    <ul className="quick-links-list">
                                        {content.quickLinks.map((link, index) => (
                                            <li key={index}>
                                                <Link onClick={ClickHandler} href={link.link}>
                                                    <i className={link.icon || "ti-angle-right"}></i>
                                                    {link.title}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Error;
