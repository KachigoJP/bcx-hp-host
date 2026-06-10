import React from "react";
import { RecentDonation } from "@/utils/interfaces/donate";
import { SectionIntro } from "@/utils/interfaces";
import styles from "./DonateRecentDonations.module.scss";

export interface DonateRecentDonationsProps {
    sectionIntro: SectionIntro;
    items: RecentDonation[];
}

const DonateRecentDonations: React.FC<DonateRecentDonationsProps> = ({ sectionIntro, items }) => {
    return (
        <section className={`${styles["wpo-recent-donations-section"]} section-padding`}>
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
                    {items.map((donation, index) => (
                        <div key={index} className="col-lg-4 col-md-6 col-12">
                            <div className={styles["donation-card"]}>
                                <div className={styles["donation-icon"]}>
                                    <i className={`fi ${donation.icon}`}></i>
                                </div>
                                <div className={styles["donation-info"]}>
                                    <h3>{donation.donor}</h3>
                                    <p>{donation.description}</p>
                                    <div className={styles["donation-meta"]}>
                                        <span className={styles["donation-title"]}>
                                            {donation.title}
                                        </span>
                                        <span className={styles["donation-amount"]}>
                                            {donation.amount}
                                        </span>
                                    </div>
                                    <div className={styles["donation-date"]}>
                                        <i className="flaticon-calendar"></i>
                                        {donation.date}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default DonateRecentDonations;
