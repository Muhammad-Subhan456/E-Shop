import React from 'react'
import {BrowserRouter,Routes,Route, useNavigate} from "react-router-dom"
import {LoginPage,SignupPage,ActivationPage,HomePage,ProductsPage,BestSellingPage,EventsPage,FAQPage,ProductDetailsPage,
  CheckoutPage,PaymentPage,OrderSuccessPage,ProfilePage,ShopCreatePage,SellerActivationPage,ShopLoginPage,
} from './Routes.js'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from 'react';
import './App.css'
import axios from 'axios';
import { server } from './server.js';
import Store from './redux/store'
import {loadSeller, loaduser} from './redux/actions/user'
import { useSelector } from 'react-redux';
import ProtectedRoute from './ProtectedRoute';
import {ShopHomePage} from "./ShopRoutes"
import SellerProtectedRoute from './SellerProtectedRoute';

export default function App() {
  const {loading, isAuthenticated} = useSelector((state)=>state.user) 
  const {isLoading, isSeller,seller } = useSelector((state)=>state.seller) 
 // const navigate = useNavigate();

  useEffect(() => {
    Store.dispatch(loaduser())
    Store.dispatch(loadSeller())

    if(isSeller){
      navigate(`/shop/${seller._id}`)
    }
  }, [])
  

  return (
    <BrowserRouter>
      <Routes>
        
        <Route path='/' element={<HomePage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/sign-up' element={<SignupPage/>}/>
        <Route path='/activation/:activation_token' element={<ActivationPage/>}/>
        <Route path='/seller/activation/:activation_token' element={<SellerActivationPage/>}/>
        <Route path='/products' element={<ProductsPage/>} />
        <Route path='/product/:name' element={<ProductDetailsPage/>} />
        <Route path='/best-selling' element={<BestSellingPage/>} />
        <Route path='/events' element={<EventsPage/>} />
        <Route path='/faq' element={<FAQPage/>} />
        <Route path='/checkout' element={
          <ProtectedRoute isAuthenticated={isAuthenticated} >
            <CheckoutPage/>
          </ProtectedRoute>
        } />
        <Route path='/payment' element={<PaymentPage/>} />
        <Route path='/order/success/:id' element={<OrderSuccessPage/>} />
        <Route path='/profile' element={
          <ProtectedRoute isAuthenticated={isAuthenticated} >
            <ProfilePage/>
          </ProtectedRoute>
        } />
        {/* shop routes */}
        <Route path='/shop-create' element={ <ShopCreatePage/>} />
        <Route path='/shop-login' element={ <ShopLoginPage/>} />
        <Route path='/shop/:id' element={ 
          <SellerProtectedRoute isSeller={isSeller} seller={seller}  >
            <ShopHomePage/>
          </SellerProtectedRoute>
        } />
      </Routes>
      
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </BrowserRouter>
  )
}
