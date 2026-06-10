import React from "react";
import { SectionDetailSectionIconItems } from "@/utils/interfaces";
import styles from "./DonateImpact.module.scss";

export type DonateImpactProps = SectionDetailSectionIconItems;

const DonateImpact: React.FC<DonateImpactProps> = ({ sectionIntro, items }) => {
    return (
        <section className={`${styles["wpo-impact-section"]} section-padding`}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="wpo-section-title text-center">
                            <span>{sectionIntro.tag}</span>
                            <h2>{sectionIntro.title}</h2>
                            <p>{sectionIntro.description}</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {items.map((item, index) => (
                        <div key={index} className="col-lg-3 col-md-6 col-12">
                            <div className={styles["wpo-impact-item"]}>
                                <div className={styles["wpo-impact-icon"]}>
                                    <i className={`fi ${item.icon}`}></i>
                                </div>
                                <div className={styles["wpo-impact-text"]}>
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default DonateImpact;
