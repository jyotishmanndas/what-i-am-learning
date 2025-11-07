import React from 'react'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Notfound from './pages/Notfound'
import Product from './pages/Product'
import Women from './pages/Women'
import Men from './pages/Men'
import Courses from './pages/Courses'
import CourseDetails from './pages/CourseDetails'

const App = () => {
  return (
    <div className='h-screen bg-gray-200'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/product' element={<Product />} >  {/* Nested Routing */}
          <Route path='men' element={<Men />} />
          <Route path='women' element={<Women />} />
        </Route>
        <Route path='/courses' element={<Courses />} />
        <Route path='/courses/:id' element={<CourseDetails />} />   {/* Dynamic Routing */}
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />

        <Route path='*' element={<Notfound />} />    {/* Not found Page */}
      </Routes>
    </div>
  )
}

export default App