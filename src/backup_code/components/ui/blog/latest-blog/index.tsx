import React from "react";
import { StaticImage, GatsbyImage, getImage } from "gatsby-plugin-image";
import { Link } from "gatsby";

// Source
import { slugify } from "@utils/functions";
import Button from "@components/common/button";
import { LastesBlogProps } from "./interface";
import {
    PostItemWrap,
    Thumb,
    MetaDate,
    ShapeLine,
    LatestBlogContent,
    LatestBlogContentInner,
    MetaBox,
    Title,
    TextDetails,
    PostShare,
    PostFooter,
} from "./style";

const LatestBlogItem: React.FC<LastesBlogProps> = (props) => {
    const { thume_image, title, date, categories, body, postAuthor, slug } =
        props;

    const dateSplit = date.split(" ");
    const month = dateSplit[0];
    const day = dateSplit[1];
    const image = getImage(thume_image);
    return (
        <PostItemWrap>
            <Thumb>
                {image ? (
                    <Link to={`/${slug}`}>
                        <GatsbyImage image={image} alt={title} />
                    </Link>
                ) : null}

                <MetaDate>
                    <Link to={`/${slug}`}>
                        <span>{day}</span>
                        {month}
                    </Link>
                </MetaDate>
                <ShapeLine />
            </Thumb>
            <LatestBlogContent>
                <LatestBlogContentInner>
                    <MetaBox>
                        {categories &&
                            categories.map((categorie, i) => (
                                <Link
                                    className="post-category"
                                    key={`${slugify(categorie)}-${i}`}
                                    to={`/categories/${slugify(categorie)}`}
                                >
                                    {categorie}
                                </Link>
                            ))}
                        <PostShare>
                            <Link className="icon-share" to="/">
                                <StaticImage
                                    src="../../../../data/images/icons/share-line-gradient.png"
                                    alt="Icon"
                                />
                            </Link>
                            <ul>
                                <li>
                                    <a className="color-facebook" href="#/">
                                        <i className="social_facebook"></i>
                                    </a>
                                </li>
                                <li>
                                    <a className="color-twitter" href="#/">
                                        <i className="social_twitter"></i>
                                    </a>
                                </li>
                                <li>
                                    <a className="color-dribbble" href="#/">
                                        <i className="social_dribbble"></i>
                                    </a>
                                </li>
                                <li>
                                    <a className="color-pinterest" href="#/">
                                        <i className="social_pinterest"></i>
                                    </a>
                                </li>
                            </ul>
                        </PostShare>
                    </MetaBox>
                    <Title>
                        <Link to={`/${slug}`}>{title}</Link>
                    </Title>
                    <TextDetails>{body}</TextDetails>
                </LatestBlogContentInner>
                <PostFooter className="PostFooter">
                    <Button
                        path={`/${slug}`}
                        size="xsmall"
                        color="border-gradient"
                    >
                        Details
                    </Button>
                    <Link className="post-author" to="/">
                        By: {postAuthor}
                    </Link>
                </PostFooter>
            </LatestBlogContent>
        </PostItemWrap>
    );
};

export default LatestBlogItem;
