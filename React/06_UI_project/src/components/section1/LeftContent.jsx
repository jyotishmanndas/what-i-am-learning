import React from 'react';
import { ArrowUpRight } from "lucide-react"

const LeftContent = () => {
    return (
        <div className='h-full w-1/3 px-5 flex justify-between flex-col'>
            <div className='flex flex-col gap-7'>
                <h2 className='text-5xl font-semibold'>Prospective <br /> <span className='text-gray-600'>customer</span> <br /> segmentation</h2>
                <p className='font-medium text-gray-400'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate fugiat velit earum pariatur similique, accusantium animi dolorum repellat ad facere maiores asperiores illo optio dolores?  </p>
            </div>

            <ArrowUpRight className='h-20 w-20' />
        </div>
    )
}

export default LeftContent
