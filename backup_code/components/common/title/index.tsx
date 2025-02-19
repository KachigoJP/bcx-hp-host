import React from "react";
import { StaticImage } from "gatsby-plugin-image";

// Source
import { SectionTitleArea, SubTitle, TitleBoxArea, Title } from "./style";
import { TitleProps } from "./interface";

const SectionTitle: React.FC<TitleProps> = (props) => {
    const {
        subTitle,
        title,
        textCenter,
        textWhate,
        titleStyle,
        showImage = true,
        className,
        css,
        texttheme,
    } = props;

    return (
        <SectionTitleArea
            className={`${className} ${textCenter ? "text-center" : ""} ${
                textWhate ? "text-white" : ""
            }`}
            css={css}
        >
            {subTitle && (
                <SubTitle
                    className={`subtitle ${
                        texttheme ? "line-white-color" : "line-theme-color"
                    } `}
                >
                    {subTitle}
                </SubTitle>
            )}
            <TitleBoxArea>
                <Title
                    className={`title ${titleStyle ? "title-style" : ""} ${
                        textWhate ? "text-white" : ""
                    }`}
                    dangerouslySetInnerHTML={{ __html: title }}
                />
                {showImage && (
                    <StaticImage
                        className="img-shape"
                        src="../../../assets/images/shape/3.png"
                        alt="Givest-HasTech"
                    />
                )}
            </TitleBoxArea>
        </SectionTitleArea>
    );
};

export default SectionTitle;
