import React from "react";
import { SectionIntro } from "@/utils/interfaces";
import styles from "./PolicyIntro.module.scss";

export type PolicyIntroProps = SectionIntro;

const PolicyIntro: React.FC<PolicyIntroProps> = ({ tag, title, description }) => {
    return (
        <section className={`${styles["wpo-policy-intro-section"]} section-padding section-padding-top`}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="wpo-section-title text-center">
                            <span>{tag}</span>
                            <h2>{title}</h2>
                            <p>{description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PolicyIntro;
