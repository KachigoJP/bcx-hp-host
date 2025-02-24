import { Interpolation, Theme } from "@emotion/react";

export interface ButtonProps {
    className?: string;
    css?: Interpolation<Theme>;
    type?: "button" | "submit" | "reset";
    color?:
        | "primary"
        | "secondary"
        | "dark"
        | "light"
        | "gradient"
        | "theme-gradient"
        | "outlined-transparent"
        | "border-gradient"
        | "border-normal";
    size?: "xsmall" | "small" | "medium" | "large" | "fullwidth";
    shape?: "rounded";
    variant?: "outlined" | "iconButton";
    path?: string;
    label?: string;
}
