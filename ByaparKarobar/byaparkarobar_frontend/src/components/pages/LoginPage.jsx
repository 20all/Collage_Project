import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import ApiService from "../../service/ApiService";
import '../../style/registerPage.css'

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email:'',
        password:''
    })
    const [message, setMessage] = useState(null)
    const navigate = useNavigate()

    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData({...formData, [name]:value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await ApiService.loginUser(formData)
            if(response.status === 200) {
                setMessage("User Successfully Logged In")
                localStorage.setItem('token', response.token)
                localStorage.setItem('role', response.role)
                setTimeout(()=>{
                    navigate('/profile')
                },4000)
            }
        } catch (error) {
            setMessage(error.response?.data.message || error.message || "Unable to login a User")
        }
    }
    
    return (
        <div className="register-page">
            <h2>Login</h2>
            {message && <p className="message">{message}</p>}
            <form action="" onSubmit={handleSubmit}>
                <label htmlFor="email">Email: </label>
                <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required />

                <label htmlFor="password">Password: </label>
                <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} required />

                <button type="submit">Login</button>
                <p className="register-link">
                    Don't have an account? <a href="/register">Register</a>
                </p>
            </form>
        </div>
    )
}
export default LoginPage