import React from "react";
import { Link } from "gatsby";

// Source
import { flatDeep, slugify } from "@utils/functions";
import { WidgetTags, TabNav, NavList } from "./style";
import { TagsProps } from "./interface";

const Tag: React.FC<TagsProps> = (props) => {
    const { tags } = props;
    const allTags = [
        ...new Set(flatDeep(tags.map((tag) => tag.node.frontmatter.tags))),
    ] as unknown as string[];

    return (
        <WidgetTags>
            <TabNav>
                {allTags.map((tag: string) => {
                    return (
                        <NavList key={slugify(tag)}>
                            <Link to={`/tag/${slugify(tag)}`}>{tag}</Link>
                        </NavList>
                    );
                })}
            </TabNav>
        </WidgetTags>
    );
};

export default Tag;
