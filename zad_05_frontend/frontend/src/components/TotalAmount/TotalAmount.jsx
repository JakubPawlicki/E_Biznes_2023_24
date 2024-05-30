import React, {useEffect, useState} from 'react';
import "./TotalAmount.css"
import {useShoppingCart} from "../../context/ShoppingCartContentProvider";
import {axiosInstance} from "../../api/api";
import {Link} from "react-router-dom";

export function TotalAmount() {

    const {cart, getItemQuantity} = useShoppingCart()
    const [productList, setProductList] = useState([])
    const [loaded, setLoaded] = useState(0)
    const [finishedLoading, setFinishedLoading] = useState(false)

    useEffect(() => {
        async function fetchData(productId) {
            const product = await axiosInstance.get(`/products/${productId}`)
            setProductList((currentList) => {
                console.log([...currentList, product.data])
                return [...currentList, product.data]
            })
            setLoaded((currentLoaded) => currentLoaded + 1)
        }

        cart.forEach(item => {
            fetchData(item.id)
        })
    }, []);

    useEffect(() => {
        if (loaded === cart.length) {
            setFinishedLoading(true)
        }
    }, [loaded]);

    if (finishedLoading) {
        return (
            <div className="cart-total-amount">
                <p className="text">Całkowita kwota to zapłaty:</p>
                <p className="price">{cart.reduce((total, item) =>
                        total + getItemQuantity(item.id) * productList.find(product => product.ID == item.id).Price
                    , 0)} zł</p>
                <Link to="/procesowanie">
                    <button className="buy-btn">Kup</button>
                </Link>
            </div>
        );
    } else {
        return <div>Loading</div>
    }
}