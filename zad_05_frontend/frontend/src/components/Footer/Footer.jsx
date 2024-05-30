import React from 'react';
import "./Footer.css"
import {FaFacebook, FaInstagram, FaRegCopyright, FaShopware} from "react-icons/fa";
import {CiYoutube} from "react-icons/ci";

export const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-logo">
                <FaShopware size={50}/>
                <p>Super sklep</p>
            </div>
            <ul className="footer-links">
                <li>O nas</li>
                <li>Sklepy</li>
                <li>Praca</li>
            </ul>
            <ul className="footer-social-media">
                <li><FaFacebook size={30}/></li>
                <li><FaInstagram size={30}/></li>
                <li><CiYoutube size={30}/></li>
            </ul>
            <hr/>
            <div className="footer-copyright">
                <FaRegCopyright/>
                <p>Jakub Pawlicki PJS</p>
            </div>

        </div>
    );
};