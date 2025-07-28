import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import {LoginPage,SignupPage,ActivationPage} from './Routes.js'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from 'react';

import './App.css'
import axios from 'axios';
export default function App() {
  useEffect(() => {
    axios.get(`${server}/user/getuser`,{withCredentials: true}).then((res)=>{
     toast.success(res.data.message)
      
    }).catch((err)=>{
      toast.error(err.response.data.message)
    })
  }, [])
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/sign-up' element={<SignupPage/>}/>
        <Route path='/activation/:url' element={<ActivationPage/>}/>
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
