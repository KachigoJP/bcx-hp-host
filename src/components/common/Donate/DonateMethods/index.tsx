import Image from "next/image";
import React from "react";
import { DonationMethod } from "@/utils/interfaces/donate";
import { SectionDetailSectionIconItems, SectionIntro } from "@/utils/interfaces";
import styles from "./DonateMethods.module.scss";

export interface DonateMethodsProps {
    sectionIntro: SectionIntro;
    items: DonationMethod[];
}

const DonateMethods: React.FC<DonateMethodsProps> = ({ sectionIntro, items }) => {
    return (
        <section className={`${styles["wpo-donation-methods-section"]} section-padding`}>
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
                        <div key={index} className="col-lg-6 col-md-6 col-12">
                            <div className={styles["wpo-method-item"]}>
                                <div className={styles["wpo-method-img"]}>
                                    {typeof item.image === "string" && (
                                        <Image src={item.image} alt={item.title} width={600} height={280} />
                                    )}
                                </div>
                                <div className={styles["wpo-method-text"]}>
                                    <h3>
                                        <i className={`fi ${item.icon}`}></i>
                                        {item.title}
                                    </h3>
                                    <p>{item.description}</p>
                                    {item.accountInfo && (
                                        <div className={styles["method-details"]}>
                                            {item.accountInfo.accountName && (
                                                <div className={styles["detail-row"]}>
                                                    <strong>Tên tài khoản:</strong> {item.accountInfo.accountName}
                                                </div>
                                            )}
                                            {item.accountInfo.accountNumber && (
                                                <div className={styles["detail-row"]}>
                                                    <strong>Số tài khoản:</strong> {item.accountInfo.accountNumber}
                                                </div>
                                            )}
                                            {item.accountInfo.bankName && (
                                                <div className={styles["detail-row"]}>
                                                    <strong>Ngân hàng:</strong> {item.accountInfo.bankName}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                    {item.qrCode && typeof item.qrCode === "string" && (
                                        <div className={styles["qr-code"]}>
                                            <Image src={item.qrCode} alt={`QR ${item.title}`} width={160} height={160} />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default DonateMethods;
