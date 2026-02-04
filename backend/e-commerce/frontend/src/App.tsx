import React from 'react'
import { Route, Routes } from 'react-router'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import Authlayout from './layouts/Authlayout'

const App = () => {
  return (
    <Routes>
      <Route element={<Authlayout />}>
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
      </Route>
    </Routes>
  )
}

export default App