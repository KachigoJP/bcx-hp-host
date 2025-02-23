import React from "react";

// Source
import { ButtonProps } from "./interface";
import { Theme } from "@theme";
import {
    StyledButton,
    StyledAnchor,
    StyledLink,
    createStyles,
    StyledSpan,
} from "./style";

const Button: React.FC<React.PropsWithChildren<ButtonProps>> = (props) => {
    const {
        type = "button",
        children,
        color = "primary",
        size = "medium",
        shape = "rounded",
        variant = "outlined",
        className,
        path,
        label,
        css,
    } = props;

    const buttonProps = {
        css: (theme: Theme) => createStyles(theme, color, size, shape, variant),
    };
    if (path) {
        const internal = /^\/(?!\/)/.test(path);
        const isHash = path.startsWith("#");

        if (internal) {
            return (
                <StyledLink
                    className={className}
                    to={path}
                    {...buttonProps}
                    css={css}
                >
                    {label && <span className="sr-only">{label}</span>}
                    <span>{children}</span>
                </StyledLink>
            );
        }
        if (isHash) {
            return (
                <StyledAnchor
                    className={className}
                    href={path}
                    {...buttonProps}
                    css={css}
                >
                    {label && <span className="sr-only">{label}</span>}
                    <StyledSpan>{children}</StyledSpan>
                </StyledAnchor>
            );
        }
        return (
            <StyledAnchor
                href={path}
                {...buttonProps}
                css={css}
                target="_blank"
                rel="noopener"
                className={className}
            >
                {label && <span className="sr-only">{label}</span>}
                <StyledSpan>{children}</StyledSpan>
            </StyledAnchor>
        );
    }

    return (
        <StyledButton {...buttonProps} {...props} css={css}>
            {children}
        </StyledButton>
    );
};

export default Button;
