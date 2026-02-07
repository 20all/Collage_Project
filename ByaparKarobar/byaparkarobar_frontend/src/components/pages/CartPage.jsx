import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import ApiService from "../../service/ApiService";
import '../../style/cartPage.css'

const CartPage = () => {
    const navigate = useNavigate()
    const [message, setMessage] = useState(null)
    const { cart, dispatch } = useCart()

    const incrementItem = (product) => {
        dispatch({ type: 'INCREMENT_ITEM', payload: product })
    }
    const decrementItem = (product) => {
        const cartItem = cart.find(item => item.id === product.id)
        if (cartItem && cartItem.quantity > 1) {
            dispatch({ type: 'DECREMENT_ITEM', payload: product })
        } else {
            dispatch({ type: 'REMOVE_ITEM', payload: product })
        }
    }
    const removeItem = (item) => {
        dispatch({ type: 'REMOVE_ITEM', payload: item })
    }
    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0)
    }
    const handleCheckout = async () => {
        if (!ApiService.isAuthenticated()) {
            setMessage("Please login first to proceed to checkout !")
            setTimeout(() => {
                setMessage(null)
                navigate('/login')
            }, 3000)
            return
        }
        const orderItems = cart.map(item => ({
            productId: item.id,
            quantity: item.quantity 
        }))
        const orderRequest = {
            items: orderItems,
            totalPrice: getTotalPrice()
        }   
        try {
            const response = await ApiService.createOrder(orderRequest)
            setMessage(response.message || "Order placed successfully!")
            setTimeout(() => {
                setMessage(null)
            }, 3000)
            if(response.status === 200) {
                dispatch({ type: 'CLEAR_CART' })
            }
        } catch (error) {
            setMessage(error.response?.data?.message || error.message || "Failed to place order. Please try again.")
            setTimeout(() => {
                setMessage(null)
            }, 3000)
        }
    }

    if (cart.length === 0) {
        return <div className="cart-page">
            <h2>Your cart is empty</h2>
        </div>
    }

    return (
        <div className="cart-page">
            <h2>Your Cart</h2>
            <ul className="cart-items">
                {cart.map(item => (
                    <li key={item.id} className="cart-item">   
                        <img src={item.imageUrl} alt={item.name} />
                        <div className="item-details">
                            <h3>{item.name}</h3>
                            <p>{item.description}</p>
                            <span className="price">Rs.{item.price.toFixed(2)}</span>
                            <div className="quantity-controls">
                                <button onClick={() => decrementItem(item)}>-</button>
                                <span>{item.quantity}</span>
                                <button onClick={() => incrementItem(item)}>+</button>
                            </div>
                        </div>
                            <button onClick={() => removeItem(item)} className="remove-button">Remove</button>
                    </li>
                ))}
            </ul>
            <div className="cart-summary">
                {message && <p className="response-message">{message}</p>}
                <h3>Total: Rs.{getTotalPrice().toFixed(2)}</h3>
                <button onClick={handleCheckout} className="checkout-button">Checkout</button>
            </div>
        </div>
    )
}
export default CartPage