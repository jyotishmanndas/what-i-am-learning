import React from 'react'
import { useOnline } from '../hooks/useOnline'

const Online = () => {
    const online = useOnline();

    return (
        <div className='h-full w-full flex items-center justify-center'>
            {online ? (
                <div className='flex items-center justify-center gap-3 text-xl'>
                    Online
                    <div className='w-2 h-2 rounded-full flex items-center bg-green-500 animate-pulse' />
                </div>
            ) : (
                <div className='flex items-center justify-center gap-3 text-xl'>
                    Offline
                    <div className='w-2 h-2 rounded-full flex items-center bg-red-500 animate-pulse' />
                </div>
            )}
        </div>
    )
}

export default Online
