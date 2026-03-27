"use client"

import { useFetchedData } from '@/hooks/useFetchedData'
import React, { useState } from 'react'

const QueryExample = () => {
    const [loadData, setIsLoadData] = useState(false)
    const { data: posts, isLoading, refetch } = useFetchedData(loadData)

    if (isLoading) {
        return (
            <div className='text-2xl'>
                Loading..
            </div>
        )
    };
    
    return (
        <div className='min-h-screen w-full bg-[oklch(14.5% 0 0)] p-6 flex items-center flex-col'>

            <h1 className='text-3xl font-semibold mb-5'>Tanstack Query</h1>

            <div className='flex items-center gap-3'>
                <button onClick={() => setIsLoadData(true)} className='px-4 py-1.5 bg-neutral-600 rounded-md text-md mb-10'>Load Data</button>

                {/* Refetch Data when onclick */}
                <button onClick={() => refetch()} className='px-4 py-1.5 bg-neutral-600 rounded-md text-md mb-10'>Refetch</button>
            </div>

            {posts && (
                posts.map((post: any) => (
                    <div key={post.id} className='max-w-2xl mx-auto flex flex-col justify-center gap-3 text-center p-4'>
                        <h4>{post.title}</h4>
                        <p>{post.body}</p>
                    </div>
                ))
            )}
        </div>
    )
}

export default QueryExample