import React from 'react';
import PropTypes from 'prop-types';
import './Product.css';
import { Link, useLocation } from "react-router-dom";
import image from "../Assets/default_product_image.png";

export const Product = (props) => {
    const location = useLocation();

    return (
        <Link to={`${location.pathname}/${props.ID}`}>
            <div className="product">
                <img src={props.image == null ? image : props.image} alt={props.Name} />
                <p>{props.Name}</p>
                <p className="product-price">{props.Price}</p>
            </div>
        </Link>
    );
};

Product.propTypes = {
    ID: PropTypes.string.isRequired,
    image: PropTypes.string,
    Name: PropTypes.string.isRequired,
    Price: PropTypes.string.isRequired
};
