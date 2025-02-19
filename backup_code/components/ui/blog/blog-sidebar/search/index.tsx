import React from "react";

import { WidgetSearchBox, FormInputItem } from "./style";

const SearchBox: React.FC = () => {
    return (
        <WidgetSearchBox>
            <form action="#" method="post">
                <FormInputItem>
                    <label htmlFor="search2" className="sr-only">
                        Search Here
                    </label>
                    <input type="text" id="search2" placeholder="Search here" />
                    <button type="submit" className="btn-src">
                        <i className="icofont-search-1"></i>
                    </button>
                </FormInputItem>
            </form>
        </WidgetSearchBox>
    );
};

export default SearchBox;
