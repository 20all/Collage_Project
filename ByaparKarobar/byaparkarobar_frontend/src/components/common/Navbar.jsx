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
                <NavLink to="/"> <img src="./BK.svg" alt="ByaparKarobar" srcset="" /> </NavLink>
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
                <NavLink to="/" activeClassName="active">Home</NavLink>
                <NavLink to="/categories" activeClassName="active">Categories</NavLink>
                {isAuthenticated && <NavLink to="/profile" activeClassName="active">My Account</NavLink>}
                {isMerchant && <NavLink to="/merchant" activeClassName="active">Merchant</NavLink>}
                {!isAuthenticated && <NavLink to="/login" activeClassName="active">Login</NavLink>}
                {isAuthenticated && <NavLink onClick={handleLogout}>Logout</NavLink>}
                <NavLink to="/cart">Cart</NavLink>
            </div>
        </nav>
    )
}
export default Navbar