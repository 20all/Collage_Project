import React, { useEffect, useState } from 'react'
import ApiService from '../../service/ApiService'
import { useNavigate } from 'react-router-dom'
import '../../style/merchantProductPage.css'
import Pagination from '../common/Pagiination'

const MerchantProductPage = () => {
    const [products, setProducts] = useState([])
    const [allProducts, setAllProducts] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const [error, setError] = useState(null)
    // const PRODUCTS_PER_PAGE = 5
    const [productsPerPage, setProductsPerPage] = useState(5)
    const navigate = useNavigate()

    useEffect(() => {
        fetchProducts()
    }, [])

    useEffect(() => {
        const start = (currentPage - 1) * productsPerPage
        const end = start + productsPerPage
        setProducts(allProducts.slice(start, end))
    }, [currentPage, allProducts, productsPerPage])

    useEffect(() => {
        setTotalPages(Math.ceil(allProducts.length / productsPerPage))
        if (currentPage > Math.ceil(allProducts.length / productsPerPage)) {
            setCurrentPage(1) // Reset to first page if current page exceeds total pages
        }
    }, [productsPerPage, allProducts])

    const fetchProducts = async () => {
        try {
            const response = await ApiService.getAllProducts()
            const productList = response.productList || []
            setTotalPages(Math.ceil(productList.length / productsPerPage))
            // setProducts(allProducts.slice((currentPage - 1) * PRODUCTS_PER_PAGE, currentPage * PRODUCTS_PER_PAGE))
            setAllProducts(productList)
        } catch (error) {
            console.log("Error Fetching list of products!", error)
            setError(error.response?.data?.message || error.message || "Failed to fetch products. Please try again later.")
        }
    }
    const handleEdit = async (id) => {
        navigate(`/merchant/edit-product/${id}`)
    }
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this product?")
        if (confirmDelete) {
            try {
                await ApiService.deleteProduct(id)
                fetchProducts() // Refresh the product list after deletion
            } catch (error) {
                setError(error.response?.data?.message || error.message || "Failed to delete products. Please try again later.")
                console.log("Error deleting product!", error)
            }
        }
    }

    return (
        <div className="merchant-product-page">
            {error ? (
                <p className='error-message'>{error}</p>
            ) : (
                <div>
                    <div className="header">
                        <h2>Products</h2>
                        <div className="page-size">
                            <label htmlFor='page-size-value'>Products per page: </label>
                            <select
                                id='page-size-value'
                                value={productsPerPage}
                                onChange={(e) => setProductsPerPage(Number(e.target.value))}
                            >
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={20}>20</option>
                            </select>
                        </div>
                    </div>
                    <button className='product-btn' onClick={() => navigate('/merchant/add-product')}>Add Product</button>
                    <ul>
                        {products.map((product) => (
                            <li key={product.id}>
                                <span>{product.name}</span>
                                {/* <div className="merchant-btn"> */}
                                <button className='product-btn' onClick={() => handleEdit(product.id)}>Edit</button>
                                <button className='merchant-delete-btn' onClick={() => handleDelete(product.id)}>Delete</button>
                                {/* </div> */}
                            </li>
                        ))}
                    </ul>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={(page) => setCurrentPage(page)} />
                </div>
            )}
        </div>
    )
}
export default MerchantProductPage