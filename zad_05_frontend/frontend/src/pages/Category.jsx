import React from 'react';
import {ProductList} from "../components/ProductList/ProductList";

export function Category(props) {
    return (
        <div><ProductList category={props.category}>
        </ProductList></div>
    );
}