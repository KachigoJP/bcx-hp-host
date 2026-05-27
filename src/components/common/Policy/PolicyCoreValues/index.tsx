import React, { useEffect, useRef } from "react";
import { SectionDetailSectionIconItems } from "@/utils/interfaces";
import styles from "./PolicyCoreValues.module.scss";

export type PolicyCoreValuesProps = SectionDetailSectionIconItems;

const PolicyCoreValues: React.FC<PolicyCoreValuesProps> = ({ sectionIntro, items }) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) entry.target.classList.add("animate");
                });
            },
            { threshold: 0.2, rootMargin: "0px 0px -50px 0px" }
        );

        if (ref.current) {
            ref.current.querySelectorAll(`.${styles["wpo-value-item"]}`).forEach((item, index) => {
                (item as HTMLElement).style.transitionDelay = `${index * 0.1}s`;
                observer.observe(item);
            });
        }

        return () => observer.disconnect();
    }, [items]);

    return (
        <section className={`${styles["wpo-core-values-section"]} section-padding`}>
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
                <div className="row" ref={ref}>
                    {items.map((value, index) => (
                        <div key={index} className="col-lg-3 col-md-6 col-12">
                            <div className={`${styles["wpo-value-item"]} text-center`}>
                                <div className={styles["wpo-value-icon"]}>
                                    <i className={value.icon}></i>
                                </div>
                                <h4>{value.title}</h4>
                                <p>{value.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PolicyCoreValues;
