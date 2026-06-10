import Image from "next/image";
import React from "react";
import { SectionIntro } from "@/utils/interfaces";
import styles from "./DonateHero.module.scss";

export interface DonateHeroProps {
    pageIntro: SectionIntro;
    stats: Array<{ number: string; label: string }>;
}

const DonateHero: React.FC<DonateHeroProps> = ({ pageIntro, stats }) => {
    return (
        <section className={`${styles["wpo-donate-hero-section"]} section-padding`}>
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6 col-md-6 col-12">
                        <div className={styles["wpo-about-img"]}>
                            <Image src="/images/donate-hero.jpg" alt="Đóng góp" width={600} height={400} />
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-12">
                        <div className={styles["wpo-about-text"]}>
                            <div className="wpo-section-title">
                                <span>{pageIntro.tag}</span>
                                <h2>{pageIntro.title}</h2>
                                <p>{pageIntro.description}</p>
                            </div>
                            <div className={styles["wpo-about-content"]}>
                                <ul>
                                    {stats.map((stat, index) => (
                                        <li key={index}>
                                            <i className="flaticon-checked"></i>
                                            <span>{stat.label}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DonateHero;
