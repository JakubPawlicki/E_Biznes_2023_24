import React from 'react';
import {CartItem} from "../components/CartItem/CartItem"
import {TotalAmount} from "../components/TotalAmount/TotalAmount"
import {useShoppingCart} from "../context/ShoppingCartContentProvider";

export function Cart() {

    const {cart, cartQuantity} = useShoppingCart()
    if (cartQuantity > 0) {
        return (<>
            {cart.map(item => <CartItem key={item.id} {...item}></CartItem>)}
            <TotalAmount></TotalAmount>
        </>);
    } else {
        return <div style={{display: "flex", alignContent: "center", alignItems: "center", justifyContent:"center"}}>
            <h1>Koszyk jest pusty!</h1>
        </div>
    }
}