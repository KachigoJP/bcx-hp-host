import React, { useEffect, useRef } from "react";
import { SectionDetailSectionListTextItemsItems } from "@/utils/interfaces";
import styles from "./PolicyFinancial.module.scss";

export type PolicyFinancialProps = SectionDetailSectionListTextItemsItems;

const PolicyFinancial: React.FC<PolicyFinancialProps> = ({ sectionIntro, items }) => {
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
            ref.current.querySelectorAll(`.${styles["wpo-financial-policy-item"]}`).forEach((item, index) => {
                (item as HTMLElement).style.transitionDelay = `${index * 0.1}s`;
                observer.observe(item);
            });
        }

        return () => observer.disconnect();
    }, [items]);

    return (
        <section className={`${styles["wpo-financial-policy-section"]} section-padding`}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 offset-lg-2">
                        <div className={`${styles["wpo-financial-policy-content"]} text-center`}>
                            <div className="wpo-section-title">
                                <span>{sectionIntro.tag}</span>
                                <h2>{sectionIntro.title}</h2>
                                <p>{sectionIntro.description}</p>
                            </div>
                            <div className={styles["wpo-financial-policy-details"]} ref={ref}>
                                <div className="row">
                                    {items.map((item, index) => (
                                        <div key={index} className="col-lg-6 col-md-6 col-12">
                                            <div className={styles["wpo-financial-policy-item"]}>
                                                <h4>{item.title}</h4>
                                                <ul>
                                                    {item.items?.map((policyItem, itemIndex) => (
                                                        <li key={itemIndex}>{policyItem.text}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PolicyFinancial;
