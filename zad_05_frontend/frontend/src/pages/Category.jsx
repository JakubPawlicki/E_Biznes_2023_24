import React from 'react';
import PropTypes from 'prop-types';
import { ProductList } from "../components/ProductList/ProductList";

export function Category(props) {
    return (
        <div>
            <ProductList category={props.category} />
        </div>
    );
}

Category.propTypes = {
    category: PropTypes.string.isRequired,
};
