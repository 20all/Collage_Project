import React, { useEffect, useState } from 'react'
import ApiService from '../../service/ApiService'
import { useNavigate, useParams } from 'react-router-dom'
import '../../style/merchantOrdersPage.css'
import Pagination from '../common/Pagiination'

const orderStatus = ["PENDING", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED", "RETURNED"]

const MerchantOrdersPage = () => {

    const [orders, setOrders] = useState([])
    const [searchStatus, setSearchStatus] = useState('')
    const [statusFilter, setStatusFilter] = useState('')
    const [filteredOrders, setFilteredOrders] = useState([])

    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const [error, setError] = useState(null)
    const ORDERS_PER_PAGE = 5

    const navigate = useNavigate()

    useEffect(() => {
        fetchOrders()
    }, [searchStatus, currentPage])

    const fetchOrders = async () => {
        try {
            let response
            if (searchStatus) {
                response = await ApiService.getOrderItemByStatus(searchStatus)
            } else {
                response = await ApiService.getAllOrders()
            }
            const orderList = response.orderList || []
            setTotalPages(Math.ceil(orderList.length / ORDERS_PER_PAGE))
            setOrders(orderList)
            setFilteredOrders(orderList.slice((currentPage - 1) * ORDERS_PER_PAGE, currentPage * ORDERS_PER_PAGE))
        } catch (error) {
            setError(error.response?.data?.message || error.message || "Failed to fetch orders. Please try again later.")
            setTimeout(() => {
                setError('')
            }, 2000);
        }
    }

    const handleFilterChange = (e) => {
        const filterValue = e.target.value
        setStatusFilter(filterValue)
        setCurrentPage(1)
        if (filterValue) {
            const filtered = orders.filter(order => order.status === filterValue)
            setFilteredOrders(filtered.slice(0, ORDERS_PER_PAGE))
            setTotalPages(Math.ceil(filtered.length / ORDERS_PER_PAGE))
        } else {
            setFilteredOrders(orders.slice(0, ORDERS_PER_PAGE))
            setTotalPages(Math.ceil(orders.length / ORDERS_PER_PAGE))
        }
    }

    const handleSearchStatusChange = (e) => {
        setSearchStatus(e.target.value)
        setCurrentPage(1)
    }

    const handleOrderDetails = (orderId) => {
        navigate(`/merchant/order-details/${orderId}`)
    }

    return (
        <div className="merchant-orders-page">
            <h2>Orders</h2>
            {error && <p className='error-message'>{error}</p>}
            <div className="filter-container">
                <div className="status-filter">
                    <label htmlFor="filter-by-status">Filter by Status:</label>
                    <select id="filter-by-status" value={statusFilter} onChange={handleFilterChange}>
                        <option value="">All Statuses</option>
                        {orderStatus.map(status => (
                            <option key={status} value={status}>{status}</option>
                        ))}
                    </select>
                </div>
                <div className="search-status">
                    <label htmlFor="search-by-status">Search by Status:</label>
                    {/* <input type="text" id="search-by-status" value={searchStatus} onChange={handleSearchStatusChange} placeholder="Enter status to search"/> */}
                    <select id="search-by-status" value={searchStatus} onChange={handleSearchStatusChange}>
                        <option value="">All Statuses</option>
                        {orderStatus.map(status => (
                            <option key={status} value={status}>{status}</option>
                        ))}
                    </select>
                </div>
            </div>
            <table className='order-table'>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Customer Name</th>
                        <th>Total Amount</th>
                        <th>Status</th>
                        <th>Date Ordered</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredOrders.length > 0 ? (
                        filteredOrders.map(order => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.customerName}</td>
                                <td>${order.totalAmount.toFixed(2)}</td>
                                <td>{order.status}</td>
                                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                <td><button onClick={() => handleOrderDetails(order.id)}>View Details</button></td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No orders found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)} />
        </div>
    )
}
export default MerchantOrdersPage