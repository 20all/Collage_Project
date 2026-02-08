import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import ApiService from "../../service/ApiService";
import Pagination from "../common/Pagiination";
import '../../style/profilePage.css'

const ProfilePage = () => {
    const [userInfo, setUserInfo] = useState(null)
    const [error, setError] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const ITEMS_PER_PAGE = 5
    const navigate = useNavigate()

    useEffect(()=>{
        const fetchUserInfo = async () => {
            try {
                const response = await ApiService.getLoggedInUserInfo()
                setUserInfo(response.user)
            } catch (error) {
                setError(error.response?.data?.message || error.message || "Unable to fetch user Info")
            }
        }
        fetchUserInfo()
    },[])

    if(!userInfo) {
        return <div>Loading.....</div>
    }

    const handleAddressClick = () => {
        navigate(userInfo.address ? '/edit-address' : '/add-address')
    }

    const orderItemList = userInfo.orderItemList || []
    const totalPages = Math.ceil(orderItemList.length / ITEMS_PER_PAGE)
    const paginationOrders = orderItemList.slice(
        (currentPage-1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE    
    )

    return (
        <div className="profile-page">
            <h2>Welcome {userInfo.name}</h2>
            {error ? (
                <p className="error-message">{error}</p>
            ): (
                <div>
                    <p><strong>Name: </strong>{userInfo.name}</p>
                    <p><strong>Email: </strong>{userInfo.email}</p>
                    <p><strong>PhoneNumber: </strong>{userInfo.phoneNumber}</p>
                    <div>
                        <h3>Address</h3>
                        {userInfo.address ? (
                            <div>
                                <p><strong>Street: </strong>{userInfo.address.street}</p>
                                <p><strong>City: </strong>{userInfo.address.city}</p>
                                <p><strong>State: </strong>{userInfo.address.state}</p>
                                <p><strong>Zip Code: </strong>{userInfo.address.zipcode}</p>
                                <p><strong>Country: </strong>{userInfo.address.country}</p>
                            </div>
                        ):(
                            <p>No Address information available !</p>
                        )}
                        <button className="profile-button" onClick={handleAddressClick}>
                            {userInfo.address ? "Edit Address" : "Add Address"}
                        </button>
                    </div>
                    <h3>Order History</h3>
                    <ul>
                        {paginationOrders.map(order => (
                            <li key={order.id}>
                                <img src={order.product?.imageUrl} alt={order.product.name} />
                                <div>
                                    <p><strong>Name: </strong>{order.product.name}</p>
                                    <p><strong>Status: </strong>{order.status}</p>
                                    <p><strong>Quantity: </strong>{order.quantity}</p>
                                    <p><strong>Price: </strong>Rs. {order.price.toFixed(2)}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <Pagination 
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(page) => setCurrentPage(page)}
                    />
                </div>
            )}
        </div>
    )
}
export default ProfilePage