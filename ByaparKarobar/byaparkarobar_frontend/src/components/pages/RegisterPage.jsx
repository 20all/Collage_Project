import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import ApiService from "../../service/ApiService";
import '../../style/registerPage.css'

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        email:'',
        name:'',
        phoneNumber:'',
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
            const response = await ApiService.registerUser(formData)
            if(response.status === 200) {
                setMessage("User Successfully Registered")
                setTimeout(()=>{
                    navigate('/login')
                },2000)
            }
        } catch (error) {
            setMessage(error.response?.data.message || error.message || "Unable to register a User")
        }
    }
    
    return (
        <div className="register-page">
            <h2>Register</h2>
            {message && <p className="message">{message}</p>} 
            <form action="" onSubmit={handleSubmit}>
                <label htmlFor="email">Email: </label>
                <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required />

                <label htmlFor="name">Name: </label>
                <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required />

                <label htmlFor="phoneNumber">Phone: </label>
                <input type="text" name="phoneNumber" id="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />

                <label htmlFor="password">Password: </label>
                <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} required />

                <button type="submit">Register</button>
                <p className="register-link">
                    Already have an account? <a href="/login">Login</a>
                </p>
            </form>
        </div>
    )
}
export default RegisterPage