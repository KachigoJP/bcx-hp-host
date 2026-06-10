import React, { useEffect, useRef } from "react";
import { SectionIcon } from "@/utils/interfaces";
import styles from "./PolicyMissionVision.module.scss";

export interface PolicyMissionVisionProps {
    items: SectionIcon[];
}

const PolicyMissionVision: React.FC<PolicyMissionVisionProps> = ({ items }) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("animate");
                    }
                });
            },
            { threshold: 0.2, rootMargin: "0px 0px -50px 0px" }
        );

        if (ref.current) {
            ref.current.querySelectorAll(`.${styles["wpo-policy-item"]}`).forEach((item, index) => {
                (item as HTMLElement).style.transitionDelay = `${index * 0.15}s`;
                observer.observe(item);
            });
        }

        return () => observer.disconnect();
    }, [items]);

    return (
        <section className={`${styles["wpo-mission-vision-section"]} section-padding`}>
            <div className="container">
                <div className="row" ref={ref}>
                    {items.map((item, index) => (
                        <div key={index} className="col-lg-6 col-md-6 col-12">
                            <div className={styles["wpo-policy-item"]}>
                                <div className={styles["wpo-policy-icon"]}>
                                    <i className={item.icon}></i>
                                </div>
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PolicyMissionVision;
