import React from 'react'
import { useTodos } from './hooks/useTodos'
import UsersCard from './components/UsersCard';
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router';
import DataFetching from './pages/DataFetching';
import SwrFetching from './pages/SwrFetching';
import Debounce from './pages/Debounce';
import Online from './pages/Online';

const App = () => {
  return (
    <div className='h-screen w-full bg-[oklch(92% 0.004 286.32)]'>
      <div>
        <Navbar />
      </div>

      <Routes>
        <Route path='/data-fetching' element={<DataFetching />} />
        <Route path='/swr' element={<SwrFetching />} />
        <Route path='/debounce' element={<Debounce />} />
        <Route path='/online' element={<Online />} />
      </Routes>
    </div>
  )
}

export default App
