import React, { useEffect, useState } from 'react'
import ApiService from '../../service/ApiService'
import { useNavigate } from 'react-router-dom'
import '../../style/merchantCategoryPage.css'

const MerchantCategoryPage = () => {

    const [categories, setCategories] = useState([])
    const navigate = useNavigate()

    useEffect(() => {

        fetchCategories()
    })
    const fetchCategories = async () => {
        try {
            const response = await ApiService.getAllCategory()
            setCategories(response.categoryList || [])
        } catch (error) {
            console.log("Error Fetching list of categories!", error)
        }
    }
    const handleEdit = async (id) => {
        navigate(`/merchant/edit-category/${id}`)
    }
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this category?")
        if (confirmDelete) {
            try {
                await ApiService.deleteCategory(id)
                fetchCategories() // Refresh the category list after deletion
            } catch (error) {
                console.log("Error deleting category!", error)
            }
        }
    }
    return (
        <div className="merchant-category-page">
            <div className="merchant-category-list">
                <h2>Category</h2>
                <button onClick={() => navigate('/merchant/add-category')}>Add Category</button>
                <ul>
                    {categories.map((category) => (
                        <li key={category.id}>
                            <span>{category.name}</span>
                            <div className="merchant-btn">
                                <button className='merchant-edit-btn' onClick={() => handleEdit(category.id)}>Edit</button>
                                <button className='merchant-delete-btn' onClick={() => handleDelete(category.id)}>Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
export default MerchantCategoryPage