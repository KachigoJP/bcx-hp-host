import React, { useEffect, useRef } from "react";
import { SectionDetailSectionListTextItemsItems } from "@/utils/interfaces";
import styles from "./PolicyActivityPolicies.module.scss";

export type PolicyActivityPoliciesProps = SectionDetailSectionListTextItemsItems;

const PolicyActivityPolicies: React.FC<PolicyActivityPoliciesProps> = ({ sectionIntro, items }) => {
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
            ref.current.querySelectorAll(`.${styles["wpo-policy-detail"]}`).forEach((item, index) => {
                (item as HTMLElement).style.transitionDelay = `${index * 0.1}s`;
                observer.observe(item);
            });
        }

        return () => observer.disconnect();
    }, [items]);

    return (
        <section className={`${styles["wpo-activity-policies-section"]} section-padding`}>
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
                    {items.map((detail, index) => (
                        <div key={index} className="col-lg-6 col-md-6 col-12">
                            <div className={styles["wpo-policy-detail"]}>
                                <h4>{detail.title}</h4>
                                <ul>
                                    {detail.items?.map((item, itemIndex) => (
                                        <li key={itemIndex}>{item.text}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PolicyActivityPolicies;
