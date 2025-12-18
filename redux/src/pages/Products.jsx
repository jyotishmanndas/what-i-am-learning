import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../config/axiosInstance';
import { useQuery } from '@tanstack/react-query'
import { useProductApi } from '../hooks/useProductApi';

const Products = () => {
  const { data, isPending } = useProductApi();

  if (isPending) {
    return <div>Loding...</div>
  }

  return (
    <div className='p-8'>
      {data?.map((p) => (
        <div key={p.id}>
          {p.title}
        </div>
      ))}
    </div>
  )
}

export default Products