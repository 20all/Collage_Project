import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import {ProtectedRoute, MerchantRoute} from './service/Guard'

import { CartProvider } from './components/context/CartContext'
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'

function App() {

  return (
    <>
     <div className="App">
      <BrowserRouter>
        <CartProvider>
          <Navbar />
          {/* <Routes> */}
            {/* OUR ROUTES */}
            
          {/* </Routes> */}
          <Footer />
        </CartProvider>
      </BrowserRouter>
     </div>
    </>
  )
}

export default App
