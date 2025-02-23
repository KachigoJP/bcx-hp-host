import React from "react";
import { StaticImage, GatsbyImage, getImage } from "gatsby-plugin-image";

// Source
import { TestimonialItemProps } from "./interface";
import {
    ClientThumbWrap,
    ClientThumb,
    QuoteIcon,
    ClientContent,
    ClientText,
    ClientInfo,
    ClientName,
    ClientDesignation,
} from "./style";

const TestimonialItem: React.FC<TestimonialItemProps> = (props) => {
    const { client, clientSaidText, clientDesignation, clientImage } = props;
    const image = getImage(clientImage);

    return (
        <div className="testimonial-single">
            <ClientThumbWrap>
                <ClientThumb>
                    {image ? <GatsbyImage image={image} alt={client} /> : null}
                </ClientThumb>
                <QuoteIcon>“</QuoteIcon>
            </ClientThumbWrap>
            <ClientContent>
                <ClientText>{clientSaidText}</ClientText>
            </ClientContent>
            <ClientInfo>
                <StaticImage
                    className="shape-line-img"
                    src="../../../assets/images/shape/line-t1.png"
                    alt="Image-Givest"
                />
                <ClientName>{client}</ClientName>
                <ClientDesignation>{clientDesignation}</ClientDesignation>
            </ClientInfo>
        </div>
    );
};

export default TestimonialItem;
