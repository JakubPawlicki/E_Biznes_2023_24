import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {Nav} from "./components/Nav/Nav";
import {Home} from "./pages/Home";
import {Category} from "./pages/Category";
import {ProductDetails} from "./pages/ProductDetails";
import {Cart} from "./pages/Cart";
import {Footer} from "./components/Footer/Footer";
import {ShoppingCartContentProvider} from "./context/ShoppingCartContentProvider";
import {Loading} from "./pages/Loading";
import {SuccessfullPayment} from "./pages/SuccessfullPayment";
import React from "react";

function App() {
    return (
        <ShoppingCartContentProvider>
            <BrowserRouter>
                <Nav/>
                <Routes>
                    <Route path='/' element={<Home/>}></Route>
                    <Route path='/laptopy' element={<Category category="1" />}></Route>
                    <Route path='/smartfony' element={<Category category="3" />}></Route>
                    <Route path='/sluchawki' element={<Category category="4" />}></Route>
                    <Route path='/laptopy/:productId' element={<ProductDetails/>}></Route>
                    <Route path='/smartfony/:productId' element={<ProductDetails/>}></Route>
                    <Route path='/sluchawki/:productId' element={<ProductDetails/>}></Route>
                    <Route path='/koszyk' element={<Cart/>}></Route>
                    <Route path='/procesowanie' element={<Loading/>}></Route>
                    <Route path='/dziekujemy' element={<SuccessfullPayment/>}></Route>
                </Routes>
                <Footer/>
            </BrowserRouter>
        </ShoppingCartContentProvider>
    );
}

export default App;
