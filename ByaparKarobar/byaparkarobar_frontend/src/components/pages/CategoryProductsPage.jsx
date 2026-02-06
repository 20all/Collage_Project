import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ApiService from "../../service/ApiService";
import './categoryProductsPage.css'
import './home.css'
import ProductList from "../common/ProductList";
import Pagination from "../common/Pagiination";

const CategoryProductsPage = () => {
    const { categoryId } = useParams()
    const [products, setProducts] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const [error, setError] = useState(null)
    const PRODUCTS_PER_PAGE = 8

    useEffect(() => {
        fetchCategoryProducts()
    }, [categoryId, currentPage])

    const fetchCategoryProducts = async () => {
        try {
            const response = await ApiService.getAllProductsByCatagoryId(categoryId)
            const allProducts = response.productList || []

            setTotalPages(Math.ceil(allProducts.length / PRODUCTS_PER_PAGE))
            setProducts(allProducts.slice((currentPage - 1) * PRODUCTS_PER_PAGE, currentPage * PRODUCTS_PER_PAGE))
        } catch (error) {
            console.error("Error fetching category products:", error)
            setError(error.response?.data?.message || error.message || "Failed to fetch products for this category.")
        }
    }

    return (
        // <div className="category-products">
        //     {
        //         error ? (
        //             <div className="error-message">{error}</div>
        //         ) : products.length === 0 ? (
        //             <div className="error-message">No products available
        //                 for this category.</div>
        //         ) : (
        //             <div>
        //                 <h2>Products in Category</h2>
        //                 <ul>
        //                     {products.map((product) => (
        //                         <li key={product.id}>
        //                             <img src={product.imageUrl} alt={product.name} />
        //                             <h3>{product.name}</h3>
        //                             <p>{product.description}</p>
        //                             <span>${product.price.toFixed(2)}</span>
        //                         </li>
        //                     ))}
        //                 </ul>
        //             </div>
        //         )
        //     }
        // </div>
        <div className="home">
            {
                error ? (
                    <p className="error-message">{error}</p>
                ) : (
                    <div>
                        <ProductList products={products} />
                        <Pagination 
                            currentPage={currentPage} 
                            totalPages={totalPages} 
                            onPageChange={(page) => setCurrentPage(page)} 
                        />  
                    </div>
                )
            }
        </div>
    )
}

export default CategoryProductsPage