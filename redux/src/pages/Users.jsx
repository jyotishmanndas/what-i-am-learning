import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useUserApi } from '../hooks/useUserApi';

const Users = () => {
  const { data, isPending } = useUserApi();

  if (isPending) {
    return <div>Loding...</div>
  }

  return (
    <div className='p-8'>
      {data?.map((u) => (
        <div key={u.id}>
          {u.username}
        </div>
      ))}
    </div>
  )
}

export default Users