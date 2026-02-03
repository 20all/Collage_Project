import React, {use, useEffect, useState} from "react";
import './home.css'
import { useLocation } from "react-router-dom";
import Pagination from "../common/Pagiination";
import ApiService from "../../service/ApiService";
import ProductList from "../common/ProductList";

const Home = () => {
    const location = useLocation()
    const [products, setProducts] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const [error, setError] = useState(null)
    const PRODUCTS_PER_PAGE = 8

    useEffect(()=> {
        const fetchProducts = async () => {
            try {
                const params = new URLSearchParams(location.search)
                // const page = parseInt(params.get('page')) || 1
                let allProducts = []
                const searchItem = params.get('search') || ''
                // setCurrentPage(page)
                if(searchItem) {
                    const response = await ApiService.searchProducts(searchItem)
                    allProducts = response.productList || []    
                } else {
                    const response = await ApiService.getAllProducts()
                    allProducts = response.productList || []
                }
                setTotalPages(Math.ceil(allProducts.length / PRODUCTS_PER_PAGE))
                setProducts(allProducts.slice((currentPage - 1) * PRODUCTS_PER_PAGE, currentPage * PRODUCTS_PER_PAGE))
            } catch (error) {
                setError(error.response?.data?.message || error.message || "Failed to fetch products. Please try again later.")
            }
        }
        fetchProducts()
    },[location.search, currentPage])

    return (
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
export default Home