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
import CartPage from './components/pages/CartPage'
import RegisterPage from './components/pages/RegisterPage'
import LoginPage from './components/pages/LoginPage'
import ProfilePage from './components/pages/ProfilePage'
import AddressPage from './components/pages/AddressPage'
import MerchantPage from './components/merchant/MerchantPage'
import MerchantCategory from './components/merchant/MerchantCategoryPage'
import MerchantCategoryPage from './components/merchant/MerchantCategoryPage'


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
            {/* <Route path='/cart' element={<ProtectedRoute><CartPage /></ProtectedRoute>} /> */}
            <Route path='/cart' element={<CartPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/login' element={<LoginPage />} />

            {/* <Route path='/profile' element={<ProfilePage />} />
            <Route path='/add-address' element={<AddressPage />} />
            <Route path='/edit-address' element={<AddressPage />} /> */}
            <Route path='/profile' element={<ProtectedRoute element={<ProfilePage />} />} />
            <Route path='/add-address' element={<ProtectedRoute element={<AddressPage />} />} />
            <Route path='/edit-address' element={<ProtectedRoute><AddressPage /></ProtectedRoute>} />

            <Route path='/merchant' element={<MerchantRoute element={<MerchantPage />} />} />
            <Route path='/merchant/categories' element={<MerchantRoute element={<MerchantCategoryPage />} />} />

          </Routes>
          <Footer />
        </CartProvider>
      </BrowserRouter>
     </div>
    </>
  )
}

export default App
