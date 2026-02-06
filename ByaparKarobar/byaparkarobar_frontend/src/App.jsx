import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import {ProtectedRoute, MerchantRoute} from './service/Guard'

import { CartProvider } from './components/context/CartContext'
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'

import Home from './components/pages/Home'
import ProductDetailsPage from './components/pages/ProductDetailsPage'
import CategoryListPage from './components/pages/CategoryListPage'
import CategoryProductsPage from './components/pages/CategoryProductsPage'


function App() {

  return (
    <>
     <div className="App">
      <BrowserRouter>
        <CartProvider>
          <Navbar />
          <Routes> 
            {/* OUR ROUTES */}
            {/* <Route path="/*" element={<Navigate to="/home" />} /> */}
            <Route path="/" element={<Home />} />
            <Route path="/product/:productId" element={<ProductDetailsPage />} />
            <Route path='/categories' element={<CategoryListPage />} />
            <Route path='category/:categoryId'element={<CategoryProductsPage />} />
          </Routes>
          <Footer />
        </CartProvider>
      </BrowserRouter>
     </div>
    </>
  )
}

export default App
