import MutationExample from '@/components/MutationExample'
import React from 'react'

const page = () => {
  return (
    <div className='h-screen w-full bg-neutral-700'>
        <h1 className='text-2xl font-semibold'>Mutation</h1>

        <MutationExample />
    </div>
  )
}

export default page