import React from 'react'

const App = () => {
  return (
    <div className='h-screen bg-[#d1d5db] flex items-center justify-center'>
      <div className='h-96 w-72 bg-red-400 rounded-xl px-4 py-14 flex items-center justify-center flex-col hover:-translate-y-2 transition duration-75'>
        <h1 className='text-center text-2xl font-bold'>Jyoti</h1>
        <p className='pt-5 text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis quia soluta aliquam nesciunt sint laudantium culpa debitis expedita fuga illo.</p>
        <button className='px-6 py-2 bg-[#737373] rounded-lg mt-5 cursor-pointer'>Click</button>
      </div>
    </div>
  )
}

export default App
