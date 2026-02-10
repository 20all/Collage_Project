import React, { useEffect, useState } from 'react'
import ApiService from '../../service/ApiService'
import { useNavigate, useParams } from 'react-router-dom'
import '../../style/addProductPage.css'

const EditProductPage = () => {

    const {productId} = useParams()
    const [image, setImage] = useState(null)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [categoryId, setCategoryId] = useState('')
    const [categories, setCategories] = useState([])
    const [message, setMessage] = useState(null)
    const [imageUrl, setImageUrl] = useState(null)
    const navigate = useNavigate()

    useEffect(()=>{
        ApiService.getAllCategory().then((response) => setCategories(response.categoryList || [])).catch((error) => console.log("Error fetching categories!", error))

        if(productId) {
            ApiService.getProductById(productId).then((response) => {
                const product_ = response.product
                setName(product_.name || '')
                setDescription(product_.description || '')
                setPrice(product_.price || '')
                setCategoryId(product_.categoryId || '')
                setImageUrl(product_.imageUrl || null)
            }).catch((error) => console.log("Error fetching product details!", error))
        }
    },[productId])

    const handleImage = (e) => {
        setImage(e.target.files[0])
        setImageUrl(URL.createObjectURL(e.target.files[0]))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const formData = new FormData()
            if(image) {
                formData.append('image', image)
            }
            formData.append('name', name)
            formData.append('description', description)
            formData.append('price', Number(price))
            formData.append('categoryId', categoryId)
            formData.append('productId', productId)

            const response = await ApiService.updateProduct(formData)
            if(response.status === 200) {
                setMessage(response.message || "Product updated successfully!")
                setTimeout(() => {
                    navigate('/merchant/products')
                }, 2000)
            }
        } catch (error) {
            setMessage(error.response?.data?.message  || error.message || "Failed to update product. Please try again later.")
        }
    }

    return(
        <div className="add-product-page">
            <form onSubmit={handleSubmit} className="add-product-form">
                <h2>Edit Product</h2>
                {message && <p className="message">{message}</p>}
                {imageUrl && <img src={imageUrl} alt={name} className="current-image" />}
                <input type="file" onChange={handleImage} />

                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Product Name" required />

                <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Product Description" required />

                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" required />

                <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required>
                    <       option value="">Select Category</option>       
                    {categories?.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>

                <button type="submit">Update Product</button>
            </form>
        </div>
    )
}

export default EditProductPage