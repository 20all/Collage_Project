import React, {useState} from "react";
import '../../style/navbar.css'
import { NavLink, useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";
import Logo from "../../assets/BK.svg"

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
        if (!searchValue.trim()) return
        navigate(`/search?query=${searchValue}`)
    }
    // const handleLogout = () => {
    //     const confirm = window.confirm("Are you sure you want to logout?")
    //     if(confirm) {
    //         ApiService.logout()
    //         setTimeout(() => {
    //             navigate('/login')
    //         }  , 500);
    //     }
    // }

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                {/* <NavLink to="/ByaparKarobar.com">  */}
                <a href="https://20all.github.io">
                <img src={Logo} alt="ByaparKarobar" srcSet="" loading="lazy" /> 
                </a>
                {/* </NavLink> */}
            </div>
            {/* SEARCH FORM */}
            <form action="" className="navbar-search" onSubmit={handleSearchSubmit}>
                <input type="text"
                placeholder="Search Products"
                value={searchValue}
                onChange={handleSearchChange}/>
                <button type="submit">Search</button>
            </form>

            <div className="navbar-link">
                <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>Home</NavLink>
                <NavLink to="/categories" className={({ isActive }) => (isActive ? "active" : "")}>Categories</NavLink>
                {isAuthenticated && <NavLink to="/profile" className={({ isActive }) => (isActive ? "active" : "")}>My Account</NavLink>}
                {isMerchant && <NavLink to="/merchant" className={({ isActive }) => (isActive ? "active" : "")}>Merchant</NavLink>}
                {!isAuthenticated && <NavLink to="/login" className={({ isActive }) => (isActive ? "active" : "")}>Login</NavLink>}
                {/* {isAuthenticated && <NavLink onClick={handleLogout}>Logout</NavLink>} */}
                <NavLink to="/cart">Cart</NavLink>
            </div>
        </nav>
    )
}
export default Navbar

// import React, { useState, useContext } from "react"
// import '../../style/navbar.css'
// import { NavLink, useNavigate } from "react-router-dom"
// // import { AuthContext } from "../../context/AuthContext"
// import { AuthContext } from "../context/AuthContext"
// import logo from "../../assets/BK.svg"

// const Navbar = () => {

//     const [searchValue, setSearchValue] = useState("")
//     const navigate = useNavigate()
//     const { isAuthenticated, isMerchant, logout } = useContext(AuthContext)

//     const handleSearchSubmit = (e) => {
//         e.preventDefault()
//         if (!searchValue.trim()) return
//         navigate(`/search?query=${searchValue}`)
//         setSearchValue("")
//     }

//     const handleLogout = () => {
//         if (window.confirm("Are you sure you want to logout?")) {
//             logout()
//             navigate("/login")
//         }
//     }

//     return (
//         <nav className="navbar">

//             <div className="navbar-brand">
//                 <NavLink to="/">
//                     <img src={logo} alt="ByaparKarobar" />
//                 </NavLink>
//             </div>

//             <form className="navbar-search" onSubmit={handleSearchSubmit}>
//                 <input
//                     type="text"
//                     placeholder="Search Products..."
//                     value={searchValue}
//                     onChange={(e) => setSearchValue(e.target.value)}
//                 />
//                 <button type="submit">Search</button>
//             </form>

//             <div className="navbar-links">
//                 <NavLink to="/">Home</NavLink>
//                 <NavLink to="/categories">Categories</NavLink>

//                 {isAuthenticated && <NavLink to="/profile">My Account</NavLink>}
//                 {isMerchant && <NavLink to="/merchant">Merchant</NavLink>}
//                 <NavLink to="/cart">Cart</NavLink>

//                 {!isAuthenticated
//                     ? <NavLink to="/login">Login</NavLink>
//                     : <button className="logout-btn" onClick={handleLogout}>Logout</button>
//                 }
//             </div>
//         </nav>
//     )
// }

// export default Navbar
