import React, { useEffect, useState } from 'react'
import ApiService from '../../service/ApiService'
import { useNavigate, useParams } from 'react-router-dom'
import '../../style/addCategory.css'

const EditCategory = () => {
    const { categoryId } = useParams()
    const [categoryName, setCategoryName] = useState('')
    const [message, setMessage] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await ApiService.getCategoryById(categoryId)
                setCategoryName(response.category.name || '')
            } catch (error) {
                setMessage(error.response?.data?.message || error.message || 'Failed to fetch category details')
                setTimeout(() => {
                    setMessage('')
                }, 3000);
            }
        }
        fetchCategory()
    }, [categoryId])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await ApiService.updateCategory( categoryId, { name: categoryName })
            if (response.status === 200) {
                setMessage(response.message)
                setTimeout(() => {
                    setMessage('')
                    navigate('/merchant/categories')
                }, 3000);
            }
        } catch (error) {
            setMessage(error.response.data.message || error.message || 'Error updating category')
        }
    }

    return (
        <div className="add-category-page">
            {message && <p className="message">{message}</p>}
            <form onSubmit={handleSubmit} className="add-category-form">
                <h2>Edit    Category</h2>
                <input type="text" placeholder='Category Name' value={categoryName} onChange={(e) => setCategoryName(e.target.value)} required />

                <button type='submit'>Update</button>
            </form>
        </div>
    )
}
export default EditCategory