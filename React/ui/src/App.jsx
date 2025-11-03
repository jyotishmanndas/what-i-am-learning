import React, { useState } from 'react'
import Login from './components/Login'
import Register from './components/Register'

const App = () => {
  const [isLogin, setIsLogin] = useState(true)
  return (
    <div className='flex items-center justify-center h-screen w-full bg-linear-to-br from-blue-50 to-indigo-100'>
      {isLogin ? <Login setIsLogin={setIsLogin} /> : <Register setIsLogin={setIsLogin} />}
    </div>
  )
}

export default App