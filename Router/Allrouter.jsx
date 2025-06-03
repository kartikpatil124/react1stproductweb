import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Component/Home'

import Addproduct from '../Component/Addproduct'
import Login from '../Component/Login'
import Product from '../Component/Product'

const Allrouter = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/product' element={<Product/>}></Route>
            <Route path='/addproduct' element={<Addproduct/>}></Route>
            <Route path='/Login' element={<Login/>}></Route>
        </Routes>
    </div>
  )
}

export default Allrouter