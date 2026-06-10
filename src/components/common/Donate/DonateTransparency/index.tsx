import React from "react";
import { SectionDetailSectionIconItems } from "@/utils/interfaces";
import styles from "./DonateTransparency.module.scss";

export type DonateTransparencyProps = SectionDetailSectionIconItems;

const DonateTransparency: React.FC<DonateTransparencyProps> = ({ sectionIntro, items }) => {
    return (
        <section className={`${styles["wpo-transparency-section"]} section-padding`}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className={`wpo-section-title text-center ${styles["section-title-light"]}`}>
                            <span>{sectionIntro.tag}</span>
                            <h2>{sectionIntro.title}</h2>
                            <p>{sectionIntro.description}</p>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    {items.map((item, index) => (
                        <div key={index} className="col-lg-3 col-md-6 col-12">
                            <div className={styles["transparency-item"]}>
                                <div className={styles["transparency-icon"]}>
                                    <i className={`fi ${item.icon}`}></i>
                                </div>
                                <h4>{item.title}</h4>
                                <p>{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default DonateTransparency;
