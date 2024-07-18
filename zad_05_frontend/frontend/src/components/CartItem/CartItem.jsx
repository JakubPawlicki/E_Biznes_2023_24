import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useShoppingCart } from "../../context/ShoppingCartContentProvider";
import { MdDeleteOutline } from "react-icons/md";
import image from "../Assets/default_product_image.png";
import "./CartItem.css";
import { axiosInstance } from "../../api/api";

export function CartItem(props) {
    const { getItemQuantity, addItemToCart, decreaseItemQuantity, removeItemFromCart } = useShoppingCart();
    const [productData, setProductData] = useState({});

    useEffect(() => {
        async function fetchData() {
            try {
                const productData = await axiosInstance.get(`/products/${props.id}`);
                setProductData(productData.data);
            } catch (error) {
                console.error('Failed to fetch product data:', error);
            }
        }
        fetchData();
    }, [props.id]);

    return (
        <div className="cart-item">
            <div className="cart-item-image">
                <img src={productData.image == null ? image : productData.image} alt={productData.Name || 'Product Image'} />
            </div>
            <div className="cart-item-name">{productData.Name}</div>
            <div className="cart-item-price">{productData.Price} zł</div>
            <div className="cart-item-quantity">
                <button onClick={() => decreaseItemQuantity(props.id)}>-</button>
                <input value={getItemQuantity(props.id)} readOnly />
                <button onClick={() => addItemToCart(props.id)}>+</button>
            </div>
            <div className="cart-item-total-price">
                {getItemQuantity(props.id) * productData.Price} zł
            </div>
            <div className="cart-item-remove">
                <button onClick={() => removeItemFromCart(props.id)}><MdDeleteOutline size={30} /></button>
            </div>
        </div>
    );
}

CartItem.propTypes = {
    id: PropTypes.string.isRequired,
};
