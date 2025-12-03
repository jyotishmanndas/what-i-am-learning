import React from 'react'
import { NavLink } from "react-router"

const Navbar = () => {
  return (
    <div className='h-16 w-full flex items-center justify-center gap-8 bg-gray-400'>
      <NavLink to="/data-fetching">
        Data Fetching
      </NavLink>
      <NavLink to="/swr">
        Using SWR
      </NavLink>
      <NavLink to="/debounce">
        Debounce
      </NavLink>
      <NavLink to="/online">
        isOnline
      </NavLink>
    </div>
  )
}

export default Navbar
