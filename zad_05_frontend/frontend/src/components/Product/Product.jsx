import React from 'react';
import './Product.css';
import {Link, useLocation} from "react-router-dom";
import image from "../Assets/default_product_image.png"

export const Product = (props) => {

    const location = useLocation();
    return (
        <Link to={`${location.pathname}/${props.ID}`}>
            <div className="product">
                <img src={props.image == null ? image : props.image} alt=""/>
                <p>{props.Name}</p>
                <p className="product-price">{props.Price}</p>
            </div>
        </Link>
    )
        ;
};