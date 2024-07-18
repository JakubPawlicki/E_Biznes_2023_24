import React, {useEffect, useState} from 'react';
import {BarLoader} from "react-spinners";
import {Navigate} from "react-router-dom";
import {useShoppingCart} from "../context/ShoppingCartContentProvider";
import {axiosInstance} from "../api/api";

export const Loading = () => {

    const {cart, removeItemFromCart} = useShoppingCart()
    const [paymentFinished, setPaymentFinished] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setPaymentFinished(true)
            cart.forEach(obj => {
                if (obj.hasOwnProperty('id')) {
                    obj['id'] = parseInt(obj['id'], 10);
                }
            });
            console.log(cart)
            axiosInstance.post('/carts', {Products: cart})
        }, 5000)
    }, [paymentFinished]);

    if(!paymentFinished) {
        return (
            <div style={{display: "flex", flexDirection: "column", margin: "100px", justifyContent: "center", alignItems: "center"}} className="loader">
                <BarLoader width={1000} height={7} color="#36d7b7"></BarLoader>
                <br/>
                <p>Płatność w toku...</p>
            </div>
        );
    }
    else {cart.forEach(item => removeItemFromCart(item.id))}
        return <Navigate to="/dziekujemy"></Navigate>
    }
};
