import React from 'react';
import Link from 'next/link';

export interface HeroItemProps {
    backgroundImage: string;
    title: string;
    subtitle: string;
    text: string;
    link: string;
}

const HeroItem: React.FC<HeroItemProps> = ({ backgroundImage, title, subtitle, text, link }) => {
    return (
        <div className="hero-slide">
            <div className="slide-inner slide-bg-image" style={{ backgroundImage: `url(${backgroundImage})` }}>
                <div className="container-fluid">
                    <div className="slide-content">
                        <div className="wpo-hero-title">
                            <h2>{title}</h2>
                        </div>
                        <div className="wpo-hero-subtitle">
                            <p>{subtitle}</p>
                        </div>
                        <div className="clearfix"></div>
                        <div className="slide-btns">
                            <Link href={link} className="theme-btn">{text}</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroItem;
