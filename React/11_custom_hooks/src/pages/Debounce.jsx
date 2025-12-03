import React, { useState } from 'react'
import { useDebounce } from '../hooks/useDebounce';

const Debounce = () => {
    const [value, setValue] = useState("");
    const debounce = useDebounce(value, 500)

    console.log("re-renders");
    

    return (
        <div className='h-[80%] w-full flex flex-col gap-3 items-center justify-center'>
            <p>Debounce value is <span className='font-medium'>{debounce}</span></p>
            <input onChange={(e) => setValue(e.target.value)} className='border px-3 py-2' type="text" placeholder='Enter something' />
        </div>
    )
}

export default Debounce
