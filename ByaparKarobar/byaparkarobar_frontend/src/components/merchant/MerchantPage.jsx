import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../../style/merchantPage.css'

const MerchantPage = () => {
    const navigate = useNavigate()

    return (
        <div className="merchant-page">
            <h2>Welcome Merchant</h2>
            <button onClick={() => navigate('/merchant/categories')}>Manage Categories</button>
            <button onClick={() => navigate('/merchant/products')}>Manage Products</button>
            <button onClick={() => navigate('/merchant/orders')}>Manage Orders</button>
        </div>
    )
}

export default MerchantPage