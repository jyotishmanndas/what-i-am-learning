import React from 'react'
import { useProductApi } from '../hooks/useProductApi';
import ProductsCard from '../components/ProductsCard';

const Products = () => {
  const { data, isPending } = useProductApi();

  if (isPending) {
    return <div>Loding...</div>
  }

  return (
    <div className='p-8 grid grid-cols-5 gap-4'>
      {data?.map((product) => (
        <ProductsCard key={product.id} product={product} />
      ))}
    </div>
  )
}

export default Products