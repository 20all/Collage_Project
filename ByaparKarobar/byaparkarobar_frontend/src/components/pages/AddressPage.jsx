import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import ApiService from "../../service/ApiService";
import '../../style/addressPage.css'

const AddressPage = () => {
    const [address, setAddress] = useState({
        street:'',
        city:'',
        state:'',
        zipCode:'',
        country:''
    })


    const [error, setError] = useState(null)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = ApiService.getLoggedInUserInfo()
                if(response.user.address) {
                    setAddress(response.user.address)
                }
            } catch (error) {
                setError(error.response?.data?.message || error.message || "Unable to fetch usesr Information")
            }
        }
        if(location.pathname === '/edit-address') {
            fetchUserInfo()
        }   
    },[location.pathname])

    const handleChange = (e) => {
        const {name, value} = e.target
        setAddress((prevAddress) => ({
            ...prevAddress,
            [name]:value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await ApiService.saveAddress(address)
            navigate('/profile')
        } catch (error) {
            setError(error.response?.data?.message || error.message || "Failed to save/update address !")
        }
    }

    return (
        <div className="address-page">
            <h2>{location.pathname === '/edit-address' ? 'Edit Address' : 'Add Address'}</h2>
            {error && <p className="error-message">{error}</p>}

            <form action="" onSubmit={handleSubmit}>
                <label htmlFor="street">Street: </label>
                <input type="text" name="street" id="street" value={address.street} onChange={handleChange} required />

                <label htmlFor="city">City: </label>
                <input type="text" name="city" id="city" value={address.city} onChange={handleChange} required />

                <label htmlFor="state">State: </label>
                <input type="text" name="state" id="state" value={address.state} onChange={handleChange} required />

                <label htmlFor="zipcode">Zipcode: </label>
                <input type="text" name="zipcode" id="zipcode" value={address.zipCode} onChange={handleChange} required />

                <label htmlFor="country">Country: </label>
                <input type="text" name="country" id="country" value={address.country} onChange={handleChange} required />

                <button type="submit">{location.pathname === '/edit-address' ? 'Edit Address' : 'Save Address'}</button>
            </form>
        </div>
    )
}
export default AddressPage