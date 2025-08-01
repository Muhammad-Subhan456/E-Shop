import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import {LoginPage,SignupPage,ActivationPage,HomePage,ProductsPage,BestSellingPage,EventsPage,FAQPage,ProductDetailsPage,
  CheckoutPage,PaymentPage,OrderSuccessPage
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


export default function App() {

  const {loading} = useSelector((state)=>state.user) 


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
        <Route path='/checkout' element={<CheckoutPage/>} />
        <Route path='/payment' element={<PaymentPage/>} />
        <Route path='/order/success/:id' element={<OrderSuccessPage/>} />
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
