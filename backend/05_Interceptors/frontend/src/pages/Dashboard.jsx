import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../config/axiosInstance'
import { useSelector } from 'react-redux'

const Dashboard = () => {
  const { user } = useSelector(state => state.auth)
  return (
    <div className='flex items-center justify-center min-h-screen'>
      <div className='h-60 w-52 bg-gray-200 rounded-lg p-3'>
        <div>
          {JSON.stringify(user.username)}
        </div>
        {JSON.stringify(user.email)}
      </div>
    </div>
  )
}

export default Dashboard