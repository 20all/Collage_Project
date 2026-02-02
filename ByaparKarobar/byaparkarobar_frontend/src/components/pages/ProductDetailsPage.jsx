import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import ApiService from "../../service/ApiService";
import './productDetailsPage.css'

const ProductDetailsPage = () => {
    const { productId } = useParams()
    const { cart, dispatch } = useCart()
    const [product, setProduct] = useState(null)

    useEffect(() => {
        fetchProduct()
    }, [productId])

    const fetchProduct = async () => {
        try {
            const response = await ApiService.getProductById(productId)
            setProduct(response.product)
        } catch (error) {
            console.error("Error fetching product details:", error)
        }
    }

    const addToCart = () => {
        if (product) {
            dispatch({ type: 'ADD_ITEM', payload: product })
        }
    }

    const incrementItem = () => {
        if (product) {
            dispatch({ type: 'INCREMENT_ITEM', payload: product })
        }
    }
    const decrementItem = () => {
        if (product) {
            const cartItem = cart.find(item => item.id === product.id)
            if (cartItem && cartItem.quantity > 1) {
                dispatch({ type: 'DECREMENT_ITEM', payload: product })
            } else {
                dispatch({ type: 'REMOVE_ITEM', payload: product })
            }
        }
    }
    if (!product) {
        return <div>Loading product details...</div>
    }

    const cartItem = cart.find(item => item.id === product.id)

    return (
        <div className="product-details">
            <img src={product?.imageUrl} alt={product?.name} />
            <h2>{product?.name}</h2>
            <p>{product?.description}</p>
            <span>${product?.price.toFixed(2)}</span>
            {cartItem ? (
                <div className="cart-controls">
                    <button onClick={decrementItem}>-</button>
                    <span>{cartItem.quantity}</span>
                    <button onClick={incrementItem}>+</button>
                </div>
            ) : (
                <button onClick={addToCart}>Add to Cart</button>
            )}
        </div>
    )
}
export default ProductDetailsPage