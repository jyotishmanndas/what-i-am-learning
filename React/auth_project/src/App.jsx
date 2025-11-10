import React, { useState } from 'react'
import Login from './components/Login'
import Register from './components/Register';

// state lifting up

const App = () => {
  const [toogle, setToogle] = useState(true);
  const [usersData, setUsersData] = useState(() => {
    return JSON.parse(localStorage.getItem("data")) || []
  })

  return (
    <div className='min-h-screen w-full flex items-center justify-center flex-col'>
      {toogle
        ? <Login setToogle={setToogle} setUsersData={setUsersData} usersData={usersData} />
        : <Register setToogle={setToogle} setUsersData={setUsersData} usersData={usersData} />}

      <div className='mt-5 flex items-center justify-center gap-3'>
        {usersData.map((user, idx) => (
          <div key={idx} className='w-64 border border-gray-200 p-5 rounded-lg hover:shadow-xl transition-shadow duration-500 cursor-pointer'>
            <h1><span className='font-semibold'>Name:</span> {user.name}</h1>
            <h3><span className='font-semibold'>Email:</span> {user.email}</h3>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App