import React, {useContext} from "react";
import {useLocalStorage} from "../hooks/UseLocalStorage";

const CartContext = React.createContext({})

export function useShoppingCart() {
    return useContext(CartContext)
}

export function ShoppingCartContentProvider({children}) {

    const [cart, setCart] = useLocalStorage("shopping-cart", [])

    const cartQuantity =
        cart.reduce((quantity, item) => quantity + item.quantity, 0)

    const getItemQuantity = (id) => {
        return cart.find((item) => item.id === id)?.quantity
    }

    const addItemToCart = (id) => {
        setCart((currentCart) => {
            const idx = currentCart.findIndex((item) => {
                return item.id === id
            })

            if (idx > -1) {
                return currentCart.map((item) => {
                    if (item.id === id) {
                        return {...item, quantity: item.quantity + 1}
                    } else
                        return item
                })
            } else {
                return [...currentCart, {id, quantity: 1}]
            }
        })
    }

    const decreaseItemQuantity = (id) => {
        setCart((currentContent) => {
            if (currentContent.find((item) => item.id === id)?.quantity === 1) {
                return currentContent.filter(item => item.id !== id)
            } else {
                return currentContent.map(item => {
                    if (item.id === id) {
                        return {...item, quantity: item.quantity - 1}
                    } else
                        return item
                })
            }
        })
    }

    const removeItemFromCart = (id) => {
        setCart((currentCart) => {
            return currentCart.filter(item => item.id !== id)
        })
    }

    return (
        <CartContext.Provider value={{
            cart,
            cartQuantity,
            getItemQuantity,
            addItemToCart,
            decreaseItemQuantity,
            removeItemFromCart
        }}>
            {children}
        </CartContext.Provider>
    );
}