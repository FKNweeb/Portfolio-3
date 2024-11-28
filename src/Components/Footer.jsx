import React from "react";
import "./Footer.css";

function Footer(){
    return (  
        <div>
        <div class="footerNavigation">
            <ul>
                <li><a href="">Home</a></li>
                <li><a href="">News</a></li>
                <li><a href="">About</a></li>
                <li><a href="">Contact Us</a></li>
                <li><a href="">our Team</a></li>
            </ul>
        </div>
    <div class="footerBottom">
        <p>Copyright &copy;2024; Designed by <span class="designer">groupe 3</span></p>
    </div>
    </div>
    );
}

export default Footer;
