import React from 'react'

const Button = ({ setpage, page }) => {
    return (
        <div className='flex items-center justify-center gap-5'>
            <button onClick={() => {
                if (page > 1) {
                    setpage(prev => prev - 1)
                }
            }} className='px-5 py-2 bg-white text-black rounded-md cursor-pointer active:scale-95'>Prev</button>
            <h2 className='text-white'> Page {page}</h2>
            <button onClick={() => {
                setpage(prev => prev + 1)
            }} className='px-5 py-2 bg-white text-black rounded-md cursor-pointer active:scale-95'>Next</button>
        </div>
    )
}

export default Button
