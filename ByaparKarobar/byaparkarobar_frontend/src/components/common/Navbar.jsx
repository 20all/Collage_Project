import React, {useState} from "react";
import './navbar.css'
import { NavLink, useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";

const Navbar = () => {
    const [searchValue, setSearchValue] = useState("")
    const navigate = useNavigate()

    const isMerchant = ApiService.isMerchant()
    const isAuthenticated = ApiService.isAuthenticated()

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value)
    }
    const handleSearchSubmit = (e) => {
        e.preventDefault()
        navigate(`/search?query=${searchValue}`)
    }
    const handleLogout = () => {
        const confirm = window.confirm("Are you sure you want to logout?")
        if(confirm) {
            ApiService.logout()
            setTimeout(() => {
                navigate('/login')
            }  , 500);
        }
    }

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <NavLink to="/"> <img src="./BK.svg" alt="ByaparKarobar" srcSet="" /> </NavLink>
            </div>
            {/* SEARCH FORM */}
            <form action="" className="navbar-search" onSubmit={handleSearchSubmit}>
                <input type="text"
                placeholder="Search Products"
                value={searchValue}
                onChange={handleSearchChange}/>
                <button type="submit" onClick={handleSearchSubmit}>Search</button>
            </form>

            <div className="navbar-link">
                <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>Home</NavLink>
                <NavLink to="/categories" className={({ isActive }) => (isActive ? "active" : "")}>Categories</NavLink>
                {isAuthenticated && <NavLink to="/profile" className={({ isActive }) => (isActive ? "active" : "")}>My Account</NavLink>}
                {isMerchant && <NavLink to="/merchant" className={({ isActive }) => (isActive ? "active" : "")}>Merchant</NavLink>}
                {!isAuthenticated && <NavLink to="/login" className={({ isActive }) => (isActive ? "active" : "")}>Login</NavLink>}
                {isAuthenticated && <NavLink onClick={handleLogout}>Logout</NavLink>}
                <NavLink to="/cart">Cart</NavLink>
            </div>
        </nav>
    )
}
export default Navbar