import React from "react";
import Image from "next/image";
import Link from "next/link";

// Source
import { HeaderLogoArea } from "./style";
import { LogoProps } from "./interface";

const Logo: React.FC<React.PropsWithChildren<LogoProps>> = (props) => {
    return (
        <HeaderLogoArea className={props.className}>
            <Link href="/">
                {props.logo ? (
                    <Image alt={props.alt || ""} src={props.logo} />
                ) : null}
            </Link>
        </HeaderLogoArea>
    );
};

export default Logo;
