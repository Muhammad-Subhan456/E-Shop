import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import {LoginPage,SignupPage,ActivationPage,HomePage,ProductsPage,BestSellingPage,EventsPage,FAQPage,ProductDetailsPage,
  CheckoutPage,PaymentPage,OrderSuccessPage,ProfilePage,ShopCreatePage,
} from './Routes.js'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from 'react';
import './App.css'
import axios from 'axios';
import { server } from './server.js';
import Store from './redux/store'
import {loaduser} from './redux/actions/user'
import { useSelector } from 'react-redux';
import ProtectedRoute from './ProtectedRoute';

export default function App() {

  const {loading, isAuthenticated} = useSelector((state)=>state.user) 


  useEffect(() => {
    Store.dispatch(loaduser())
  }, [])
  

  return (
    <BrowserRouter>
      <Routes>
        
        <Route path='/' element={<HomePage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/sign-up' element={<SignupPage/>}/>
        <Route path='/activation/:activation_token' element={<ActivationPage/>}/>
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
        <Route path='/shop-create' element={ <ShopCreatePage/>} />
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
