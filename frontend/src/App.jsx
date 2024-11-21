import React from 'react'
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import { Navigate, Route, Routes } from 'react-router-dom'
import PageNotFound from './components/PageNotFound'
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const token = localStorage.getItem("jwt")
  return (
    <div> 
    <Routes>
      <Route path="/" element={token?<Home/>:<Navigate to ={"/login"}/>}/>
      <Route path="/register" element={<Signup/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="*" element={<PageNotFound/>}/>
    </Routes>
    <Toaster />
    </div>

  )
}

export default App