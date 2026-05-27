import React, { useEffect, useRef } from "react";
import { SectionDetailSectionIconItems } from "@/utils/interfaces";
import styles from "./PolicyCodeOfConduct.module.scss";

export type PolicyCodeOfConductProps = SectionDetailSectionIconItems;

const PolicyCodeOfConduct: React.FC<PolicyCodeOfConductProps> = ({ sectionIntro, items }) => {
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
            ref.current.querySelectorAll(`.${styles["wpo-conduct-item"]}`).forEach((item, index) => {
                (item as HTMLElement).style.transitionDelay = `${index * 0.1}s`;
                observer.observe(item);
            });
        }

        return () => observer.disconnect();
    }, [items]);

    return (
        <section className={`${styles["wpo-code-conduct-section"]} section-padding`}>
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
                    {items.map((conduct, index) => (
                        <div key={index} className="col-lg-4 col-md-6 col-12">
                            <div className={`${styles["wpo-conduct-item"]} text-center`}>
                                <div className={styles["wpo-conduct-icon"]}>
                                    <i className={conduct.icon}></i>
                                </div>
                                <h4>{conduct.title}</h4>
                                <p>{conduct.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PolicyCodeOfConduct;
