import image from "../components/Assets/default_product_image.png";
import {useShoppingCart} from "../context/ShoppingCartContentProvider";
import {useParams} from "react-router-dom";
import {axiosInstance} from "../api/api";
import {useEffect, useState} from "react";

export function ProductDetails() {
    const {addItemToCart} = useShoppingCart();
    const {productId} = useParams();
    const [productData, setProductData] = useState({})

    useEffect(() => {
        async function fetchData() {
            try {
                const productData = await axiosInstance.get(`/products/${productId}`)
                setProductData(productData.data)
            } catch (err) {
                console.log(err.response.data)
                console.log(err.response.status)
                console.log(err.response.headers)
            }
        }
        fetchData()
    }, [productId]);

    return (
        <div className="product-details">
            <div className="product-details-left">
                <img src={productData.image == null ? image : productData.image} alt=""/>
            </div>
            <div className="product-details-right">
                <p>{productData.Name}</p>
                <div className="product-details-price">{productData.Price}</div>
                <div className="product-details-buy-btn">
                    <button onClick={() => addItemToCart(productId)}>Dodaj do koszyka</button>
                </div>
            </div>
        </div>
    );
}