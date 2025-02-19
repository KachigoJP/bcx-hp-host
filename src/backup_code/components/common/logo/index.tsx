import React from "react";
import { Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

// Source
import { HeaderLogoArea } from "./style";
import { LogoProps } from "./interface";

const Logo: React.FC<React.PropsWithChildren<LogoProps>> = (props) => {
    const logo = getImage(props.logo);

    return (
        <HeaderLogoArea className={props.className}>
            <Link to="/">
                {logo ? (
                    <GatsbyImage alt={props.alt || ""} image={logo} />
                ) : null}
            </Link>
        </HeaderLogoArea>
    );
};

export default Logo;
