import React from 'react'
import { Route, Routes, useLocation } from "react-router";
import Auth from './pages/Auth';
import PublicRoute from './components/PublicRoute';
import ProtectedRoute from './components/ProtectedRoute';
import Products from './pages/Products';
import Navbar from './components/Navbar';
import Users from './pages/Users';
import Cart from './pages/Cart';

const App = () => {
  const { pathname } = useLocation();

  return (
    <div>
      {pathname === "/" ? null : <Navbar />}
      <Routes>
        <Route path='/' element={<PublicRoute>
          <Auth />
        </PublicRoute>} />
        <Route path='/products' element={<ProtectedRoute>
          <Products />
        </ProtectedRoute>} />
        <Route path='/users' element={<ProtectedRoute>
          <Users />
        </ProtectedRoute>} />
        <Route path='/cart' element={<ProtectedRoute>
          <Cart />
        </ProtectedRoute>} />
      </Routes>
    </div>
  )
}

export default App