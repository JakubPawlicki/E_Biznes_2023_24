import { FiShoppingCart } from "react-icons/fi";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useShoppingCart } from "../../context/ShoppingCartContentProvider";
import "./Nav.css";

export function Nav() {
    const { cartQuantity } = useShoppingCart();
    const [menu, setMenu] = useState("");

    const handleCartKeyDown = (event) => {
        if (event.key === 'Enter' || event.key === ' ') {}
    };

    return (
        <nav>
            <div className="nav-logo"></div>
            <ul className="nav-menu">
                <li onClick={() => setMenu("laptops")} className={menu === "laptops" ? "chosen" : ""}>
                    <Link to="/laptopy">Laptopy</Link>
                </li>
                <li onClick={() => setMenu("smartphones")} className={menu === "smartphones" ? "chosen" : ""}>
                    <Link to="/smartfony">Smartfony</Link>
                </li>
                <li onClick={() => setMenu("headphones")} className={menu === "headphones" ? "chosen" : ""}>
                    <Link to="/sluchawki">Słuchawki</Link>
                </li>
            </ul>
            <div className="nav-cart" tabIndex={0} onClick={() => {}}>
                <Link to="/koszyk">
                    <FiShoppingCart size={25} />
                    <div className="nav-cart-count">{cartQuantity}</div>
                </Link>
            </div>
        </nav>
    );
}
