import React from "react";
import Link from "next/link";
import Image from "next/image";

// Source
import { HeaderLogoArea } from "./style";
import { LogoProps } from "./interface";

const Logo: React.FC<React.PropsWithChildren<LogoProps>> = (props) => {
  const { logo } = props;

  return (
    <HeaderLogoArea className={props.className}>
      <Link href="/">
        {logo ? <Image alt={props.alt || ""} src={logo} fill /> : null}
      </Link>
    </HeaderLogoArea>
  );
};

export default Logo;
