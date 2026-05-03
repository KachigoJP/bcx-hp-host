import React from "react";
import Image, { StaticImageData } from "next/image";
import styles from "../Testimonial.module.scss";

export interface TestimonialItemProps {
    image: string | StaticImageData;
    title: string;
    subtitle: string;
    description: string;
}

const TestimonialItem: React.FC<TestimonialItemProps> = ({ image, description, title, subtitle }) => {
    return (
        <div className={styles["wpo-testimonial-item"]}>
            <div className={styles["wpo-testimonial-img"]}>
                <Image src={image} alt="" width={150} height={150}/>
            </div>
            <div className={styles["wpo-testimonial-content"]}>
                <p>{description}</p>
                <h2>{title}</h2>
                <span>{subtitle}</span>
            </div>
        </div>
    );
};

export default TestimonialItem;
