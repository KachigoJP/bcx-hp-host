import React from "react";
import { Link } from "gatsby";
import PropTypes from "prop-types";
import { flatDeep, slugify, containsObject } from "@utils/functions";
import { Widgetcategory } from "./style";

const Categories = ({ categories }) => {
    const allCategories = flatDeep(
        categories.map((cate) => cate.node.frontmatter.categories)
    );
    let cats = [];
    allCategories.forEach((cat) => {
        const obj = {
            title: cat.trim(),
            slug: slugify(cat),
            count: 1,
        };
        const objIndex = containsObject(obj, cats);
        if (objIndex !== -1) {
            const prevCount = cats[objIndex].count;
            cats[objIndex] = {
                title: cat.trim(),
                slug: slugify(cat),
                count: prevCount + 1,
            };
        } else {
            cats.push(obj);
        }
    });
    return (
        <Widgetcategory>
            {cats.map((cat) => (
                <Link key={cat.slug} to={`/categories/${cat.slug}`}>
                    {cat.title} <span>({cat.count})</span>
                </Link>
            ))}
        </Widgetcategory>
    );
};

Categories.propTypes = {
    categories: PropTypes.array,
};

export default Categories;
