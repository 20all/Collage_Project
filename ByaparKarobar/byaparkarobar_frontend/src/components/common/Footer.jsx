import React from "react";
import '../../style/footer.css'
import { NavLink } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-links">
                <ul>
                    <NavLink to="/" className={({ isActive }) => (isActive ? "" : "")}>Aout Us</NavLink>
                    <NavLink to="/" className={({ isActive }) => (isActive ? "" : "")}>Contact Us</NavLink>
                    <NavLink to="/" className={({ isActive }) => (isActive ? "" : "")}>Terms & Conditions</NavLink>
                    <NavLink to="/" className={({ isActive }) => (isActive ? "" : "")}>Privacy Policy</NavLink>
                    <NavLink to="/" className={({ isActive }) => (isActive ? "" : "")}>FAQs</NavLink>
                </ul>
            </div>
            <div className="footer-info">
                <p>&copy; 2026 ByaparKarobar. All rights reserved.</p>
            </div>
        </footer>
    )
}
export default Footer