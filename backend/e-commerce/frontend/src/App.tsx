import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router'
import Signup from './pages/Signup'
import Login from './pages/Login'
import ProductCreate from './pages/ProductCreate'
import Authlayout from './layouts/Authlayout'
import Home from './pages/Home'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import { axiosInstance } from './config/axiosInstance'
import { useAppDispatch } from './hooks/useRedux'
import { toast } from 'sonner'
import { setUser } from './features/authSlice'
import PublicRoute from './components/PublicRoute'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    axiosInstance.get("/api/v1/user/profile")
      .then(res => dispatch(setUser(res.data.data)))
      .catch(err => toast(err.response.data.msg))
  }, [])

  return (
    <Routes>
      <Route element={<Authlayout />}>
        <Route path='/signup' element={<PublicRoute><Signup /></PublicRoute>} />
        <Route path='/login' element={<PublicRoute><Login /></PublicRoute>} />
      </Route>
      <Route path='/product/create' element={<ProductCreate />} />
      <Route path='/product/:productId' element={<ProtectedRoute><ProductDetails /></ProtectedRoute>} />
      <Route path='/home' element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path='/cart' element={<ProtectedRoute><Cart /></ProtectedRoute>} />
    </Routes>
  )
}

export default App