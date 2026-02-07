import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";
import '../../style/categoryListPage.css'

const CategoryListPage = () => {
    const [categories, setCategories] = useState([])
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        fetchCategories()
    }, [])

    const fetchCategories = async () => {
        try {
            const response = await ApiService.getAllCategory()
            setCategories(response.categoryList || [])
        } catch (error) {
            console.error("Error fetching categories:", error)
            setError(error.response?.data?.message || error.message || "Failed to fetch categories.")
        }
    }

    const handleCategoryClick = (categoryId) => {
        navigate(`/category/${categoryId}`)
    }

    return (
        <div className="category-list">
            {
                error ? (
                    <div className="error-message">{error}</div>
                ) 
                // : categories.length === 0 ? (
                //     <div className="error-message">No categories available.</div>
                // ) 
                : (
                    <div>
                        <h2>Categories</h2>
                        <ul>
                            {categories.map((category) => (
                                <li key={category.id} >
                                    <button onClick={() => handleCategoryClick(category.id)}>{category.name}</button>
                                    {/* {category.name} */}
                                </li>
                            ))}
                        </ul>  
                    </div>
                )
            }
        </div>
    )
}

export default CategoryListPage