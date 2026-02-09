import React, { useEffect, useState } from 'react'
import ApiService from '../../service/ApiService'
import { useNavigate } from 'react-router-dom'
import '../../style/addCategory.css'

const AddCategory = () => {
    const [categoryName, setCategoryName] = useState('')
    const [message, setMessage] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const trimmedCategoryName = categoryName.trim()
        if (!trimmedCategoryName) {
            setMessage("Category name is required")
            return
        }
        try {
            const response = await ApiService.createCategory({name: trimmedCategoryName })
            if (response.status === 200) {
                setMessage(response.message)
                setTimeout(() => {
                    setMessage('')
                    navigate('/merchant/categories')
                }, 3000);
            }
        } catch (error) {
            setMessage(error.response.data.message || error.message || 'Error creating category')
            setTimeout(() => {
                    setMessage('')
                }, 3000);
        }
    }

    return (
        <div className="add-category-page">
            {message && <p className="message">{message}</p>}
            <form onSubmit={handleSubmit} className="add-category-form">
                <h2>Add New Category</h2>
                <input type="text" placeholder='Category Name' value={categoryName} onChange={(e) => setCategoryName(e.target.value)} required />

                <button type='submit'>Add</button>
            </form>
        </div>
    )
}
export default AddCategory