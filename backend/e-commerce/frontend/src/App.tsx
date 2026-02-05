import React from 'react'
import { Route, Routes } from 'react-router'
import Signup from './pages/Signup'
import Login from './pages/Login'
import ProductCreate from './pages/ProductCreate'
import Authlayout from './layouts/Authlayout'
import Home from './pages/Home'

const App = () => {
  return (
    <Routes>
      <Route element={<Authlayout />}>
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/product/create' element={<ProductCreate />} />
      </Route>
      <Route path='/home' element={<Home />} />
    </Routes>
  )
}

export default App