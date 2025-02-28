import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export interface AboutProps {
    image?: string;
    totalRaised: number;
    about: {
        title: string;
        description: string;
        points: string[];
        linkText: string;
        linkHref: string;
    };
    totalNeed: number;
}

const About: React.FC<AboutProps> = ({ totalRaised, about, totalNeed = 100, image = '/assets/images/default/about.png' }) => {
    const ClickHandler = () => {
        window.scrollTo(10, 0);
    };

    const completePercent = (totalRaised / totalNeed) * 100;

    return (
        <section className="wpo-about-section-s2 section-padding">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6 col-md-12 col-12">
                        <div className="wpo-about-wrap">
                            <div className="wpo-about-img">
                                <Image src={image} width={581} height={576} alt="" />
                                <div className="wpo-total-raised">
                                    <div className="wpo-total-raised-wrap">
                                        <div className="wpo-total-raised-icon">
                                            <i className="fi flaticon-wallet-filled-money-tool"></i>
                                        </div>
                                        <div className="wpo-total-raised-text">
                                            <ul>
                                                <li>Total Raised<span>${totalRaised}</span></li>
                                            </ul>
                                            <div className="progress-section">
                                                <div className="process">
                                                    <div className="progress">
                                                        <div className="progress-bar" style={{width: `${completePercent}%`}}>
                                                            <div className="progress-value"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="round-ball-1"></div>
                                <div className="round-ball-2"></div>
                                <div className="round-ball-3"></div>
                                <div className="round-ball-4"></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-12 col-12">
                        <div className="wpo-about-text">
                            <span>About Us</span>
                            <h2>{about.title}</h2>
                            <p>{about.description}</p>
                            <ul>
                                {about.points.map((point, index) => (
                                    <li key={index}>{point}</li>
                                ))}
                            </ul>
                            <Link onClick={ClickHandler} className="theme-btn-s2" href={about.linkHref}>{about.linkText}</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default About;
