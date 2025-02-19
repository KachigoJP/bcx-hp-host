import React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

// Source
import { BrandLogoItem } from "./style";
import { SponsorItemProps } from "./interface";

const SponsorLogo: React.FC<SponsorItemProps> = (props) => {
    const image = getImage(props.sponsorLogo);
    return (
        <BrandLogoItem>
            {image ? <GatsbyImage image={image} alt="Image-Givest" /> : null}
        </BrandLogoItem>
    );
};

export default SponsorLogo;
