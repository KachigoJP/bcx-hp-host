import React from "react";
import { Pagination } from "react-bootstrap";

// Source
import { NavItem, NavLink } from "./style";
import { PaginationProps } from "./interface";

const PaginationLinks: React.FC<PaginationProps> = (props) => {
    const { currentPage, numberOfPages } = props;

    const isFirst = currentPage === 1;
    const isLast = currentPage === numberOfPages;
    const previousPage =
        currentPage - 1 === 1
            ? "/blog/"
            : "/blog/" + (currentPage - 1).toString();
    const nextPage = "/blog/" + (currentPage + 1).toString();

    return (
        <Pagination>
            {isFirst ? (
                <NavItem className="disabled">
                    <NavLink href="/blog/">Next</NavLink>
                </NavItem>
            ) : (
                <NavItem>
                    <NavLink href={previousPage}>Next</NavLink>
                </NavItem>
            )}
            {Array.from({ length: numberOfPages }, (_, i) =>
                currentPage === i + 1 ? (
                    <NavItem key={`page-number-${i + 1}`}>
                        <NavLink
                            className="active"
                            href={`/blog${i === 0 ? "" : "/" + (i + 1)}`}
                        >
                            {i + 1}
                        </NavLink>
                    </NavItem>
                ) : (
                    <NavItem key={`page-number-${i + 1}`}>
                        <NavLink
                            href={`${i === 0 ? "/blog" : "/blog/" + (i + 1)}`}
                        >
                            {i + 1}
                        </NavLink>
                    </NavItem>
                )
            )}
            {isLast ? (
                <NavItem className="disabled">
                    <NavLink href={nextPage}>Prev</NavLink>
                </NavItem>
            ) : (
                <NavItem>
                    <NavLink href={nextPage}>Prev</NavLink>
                </NavItem>
            )}
        </Pagination>
    );
};

export default PaginationLinks;
