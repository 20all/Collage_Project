import React, { useEffect, useState } from 'react'
import ApiService from '../../service/ApiService'
import { useNavigate, useParams } from 'react-router-dom'
import '../../style/merchantOrderDetailsPage.css'
import Pagination from '../common/Pagiination'

const orderStatus = ["PENDING", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED", "RETURNED"]

const MerchantOrderDetailsPage = () => {
    const { itemId } = useParams()
    const [orderItems, setOrderItems] = useState([])
    const [message, setMessage] = useState(null)
    const [selectedStatus, setSelectedStatus] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        fetchOrderDetails(itemId)
    }, [itemId])

    const fetchOrderDetails = async (itemId) => {
        try {
            const response = await ApiService.getOrderItemById(itemId)
            setOrderItems(response.orderItemList || [])
        } catch (error) {
            setMessage(error.response?.data?.message || error.message || "Failed to fetch order details. Please try again later.")
            setTimeout(() => {
                setMessage('')
                navigate('/merchant/orders')
            }, 2000);
        }
    }

    const handleStatusChange = (orderItemId, newStatus) => {
        // setSelectedStatus(prev => ({
        //     ...prev,
        //     [orderItemId]: newStatus
        // }))
        setSelectedStatus({...selectedStatus, [orderItemId]: newStatus})
    }

    const handleSubmitStatusChange = async (orderItemId) => {
        try {
            const response = await ApiService.updateOrderItemStatus(orderItemId, selectedStatus[orderItemId])
            setMessage("Order status updated successfully.")
            setTimeout(() => {
                setMessage('')
                navigate('/merchant/orders')
            }, 2000);
        } catch (error) {
            setMessage(error.response?.data?.message || error.message || "Failed to update order status.")
        }
    }

    return (
        <div className="order-details-page">
            <h2>Order Details</h2>
            {/* {message && <div className="message">{message}</div>} */}
            {orderItems.length ? (
                orderItems.map((orderItem) => (
                    <div key={orderItem.id} className="order-item-details">
                        <div className="info">
                            <h3>Order Information</h3>
                            <p><strong>Order Item Id: </strong> {orderItem.id}</p>
                            <p><strong>Quantity: </strong> {orderItem.quantity}</p>
                            <p><strong>Total Price: </strong> Rs. {orderItem.price.toFixed(2)}</p>
                            <p><strong>Order Status: </strong> {orderItem.status}</p>
                            <p><strong>Date Ordered: </strong> {new Date(orderItem.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div className="info">
                            <h3>User Information</h3>
                            <p><strong>Name: </strong> {orderItem.user?.name}</p>
                            <p><strong>Email: </strong> {orderItem.user?.email}</p>
                            <p><strong>Phone Number: </strong> {orderItem.user?.phoneNumber}</p>
                            <p><strong>Role: </strong> {orderItem.user?.role}</p>

                            <div className="info">
                            <h3>Delivery Address</h3>
                            <p><strong>Country: </strong> {orderItem.user.address?.country}</p>
                            <p><strong>State: </strong> {orderItem.user.address?.state}</p>
                            <p><strong>City: </strong> {orderItem.user.address?.city}</p>
                            <p><strong>Street: </strong> {orderItem.user.address?.street}</p>
                            <p><strong>Zip Code: </strong> {orderItem.user.address?.zipcode}</p>
                        </div>
                        </div>

                        
                        <div className='product-info'>
                            <h2>Product Information</h2>
                            <img src={orderItem.product?.imageUrl} alt={orderItem.product?.name} />
                            <p><strong>Name: </strong> {orderItem.product?.name}</p>
                            <p><strong>Description: </strong> {orderItem.product?.description}</p>
                            <p><strong>Price: </strong> Rs. {orderItem.product?.price.toFixed(2)}</p>
                        </div>
                        <div className="status-change">
                            <h3>Update Order Status</h3>
                            <select value={selectedStatus[orderItem.id] || orderItem.status} onChange={(e) => handleStatusChange(orderItem.id, e.target.value)}>
                                {orderStatus.map(status => (
                                    <option key={status} value={status}>{status}</option>
                                ))}
                            </select>
                            {message && <div className="message">{message}</div>}
                            <button className="update-status-button" onClick={() => handleSubmitStatusChange(orderItem.id)}>Update Status</button>
                        </div>
                    </div>

                ))
            ) : (<p>Loaging order details....</p>)}
        </div>
    )   
}
export default MerchantOrderDetailsPage