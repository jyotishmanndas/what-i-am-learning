import React from 'react'
import { Route, Routes } from 'react-router'
import Signup from './components/pages/Signup'
import Login from './components/pages/Login'

const App = () => {
  return (
    <Routes>
      <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Login />} />
    </Routes>
  )
}

export default App