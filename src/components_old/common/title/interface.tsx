import { Interpolation, Theme } from "@emotion/react";

export interface TitleProps {
    title: string;
    subTitle?: string;
    className?: string;
    showImage?: boolean;
    css: Interpolation<Theme>;
    textCenter?: boolean;
    titleStyle?: boolean;
    texttheme?: boolean;
    textWhate?: boolean;
}
