import React, {useEffect, useState} from 'react';
import "./ProductList.css"
import {Product} from "../Product/Product";
import {axiosInstance} from "../../api/api";
export const ProductList = (props) => {

    const [productList, setProductList] = useState([])

    useEffect(() => {
        async function fetchData() {
            try {
                const products = await axiosInstance.get(`/categories/${props.category}`)
                setProductList(products.data.Products)
            } catch (err) {
                console.log(err.response.data)
                console.log(err.response.status)
                console.log(err.response.headers)
            }
        }
        fetchData()
    }, [props.category]);

    return (
        <div className="offers-section">
            <h1>Produkty</h1>
            <hr/>
            <div className="offers-list">
                {productList.map((item, index) => {
                    return <Product key={index} {...item}></Product>
                })}
            </div>
        </div>
    );
};