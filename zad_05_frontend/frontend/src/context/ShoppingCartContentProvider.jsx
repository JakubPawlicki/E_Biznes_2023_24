import React, { useContext, useMemo } from "react";
import PropTypes from 'prop-types';
import { useLocalStorage } from "../hooks/UseLocalStorage";

const CartContext = React.createContext({});

export function useShoppingCart() {
    return useContext(CartContext);
}

export function ShoppingCartContentProvider({ children }) {
    const [cart, setCart] = useLocalStorage("shopping-cart", []);

    const cartQuantity = useMemo(() => {
        return cart.reduce((quantity, item) => quantity + item.quantity, 0);
    }, [cart]);

    const getItemQuantity = (id) => {
        return cart.find((item) => item.id === id)?.quantity;
    };

    const addItemToCart = (id) => {
        setCart((currentCart) => {
            const idx = currentCart.findIndex((item) => item.id === id);

            if (idx > -1) {
                return currentCart.map((item) => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity + 1 };
                    } else {
                        return item;
                    }
                });
            } else {
                return [...currentCart, { id, quantity: 1 }];
            }
        });
    };

    const decreaseItemQuantity = (id) => {
        setCart((currentContent) => {
            if (currentContent.find((item) => item.id === id)?.quantity === 1) {
                return currentContent.filter(item => item.id !== id);
            } else {
                return currentContent.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity - 1 };
                    } else {
                        return item;
                    }
                });
            }
        });
    };

    const removeItemFromCart = (id) => {
        setCart((currentCart) => {
            return currentCart.filter(item => item.id !== id);
        });
    };

    const contextValue = useMemo(() => ({
        cart,
        cartQuantity,
        getItemQuantity,
        addItemToCart,
        decreaseItemQuantity,
        removeItemFromCart
    }), [cart, cartQuantity, getItemQuantity, addItemToCart, decreaseItemQuantity, removeItemFromCart]);

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
}

ShoppingCartContentProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
