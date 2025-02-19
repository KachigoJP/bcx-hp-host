import React from "react";
import { Link } from "gatsby";
import { StaticImage, GatsbyImage, getImage } from "gatsby-plugin-image";

// Source
import { slugify } from "@utils/functions";
import Button from "@components/common/button";
import { authors } from "@utils/authors";
import {
    PostItemWrap,
    PostThumb,
    MetaDate,
    ShapeLine,
    ListBlogContent,
    ListBlogContentInner,
    MetaBox,
    Title,
    TextDetails,
} from "./style";
import { ListBlogProps } from "./interface";

const BlogList: React.FC<ListBlogProps> = ({
    thume_image,
    title,
    date,
    categories,
    body,
    postAuthor,
    slug,
}) => {
    const dateSplit = date.split(" ");
    const month = dateSplit[0];
    const day = dateSplit[1];
    const image = getImage(thume_image);

    // Author Post page
    const author = authors.find((x) => x.name === postAuthor);

    return (
        <PostItemWrap>
            <PostThumb className="post-hover">
                {image ? (
                    <Link to={`/${slug}`}>
                        <GatsbyImage image={image} alt={title} />
                    </Link>
                ) : null}
                <MetaDate>
                    <Link to="/">
                        <span>{day}</span>
                        {month}
                    </Link>
                </MetaDate>
                <ShapeLine />
            </PostThumb>
            <ListBlogContent>
                <ListBlogContentInner>
                    <MetaBox>
                        {categories.map((categorie, i) => (
                            <Link
                                className="post-category"
                                key={`${slugify(categorie)}-${i}`}
                                to={`/categories/${slugify(categorie)}`}
                            >
                                {categorie}
                            </Link>
                        ))}
                        {author && (
                            <Link className="post-author" to="/">
                                <span className="icon">
                                    <StaticImage
                                        className="icon-img"
                                        src="../../../data/images/icons/admin1.png"
                                        alt="Icon-Image"
                                    />
                                </span>
                                By: {author && author.name}
                            </Link>
                        )}
                    </MetaBox>
                    <Title>
                        <Link to={`/${slug}`}>{title}</Link>
                    </Title>
                    <TextDetails>{body}</TextDetails>
                    <Button
                        css={{ mt: "20px" }}
                        path={`/${slug}`}
                        size="small"
                        color="border-gradient"
                    >
                        Read More{" "}
                        <i
                            className="flaticon-right-arrow"
                            css={{ fontSize: "12px" }}
                        ></i>
                    </Button>
                </ListBlogContentInner>
            </ListBlogContent>
        </PostItemWrap>
    );
};

export default BlogList;
