import React from 'react'
import { useSelector } from 'react-redux'
import Login from '../components/Login'
import Register from '../components/Register'

const Auth = () => {
    const { toggle } = useSelector(state => state.toggle)

    return (
        <div className='min-h-screen'>
            {toggle ? <Login /> : <Register /> }
        </div>
    )
}

export default Auth