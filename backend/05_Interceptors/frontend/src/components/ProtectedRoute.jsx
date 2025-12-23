import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router';

const ProtectedRoute = () => {
    const { user, loading } = useSelector(state => state.auth);

    if(loading){
        return <div>loading...</div>
    }

    if (!user) {
        return <Navigate to="/login" />
    }

    return <Outlet />
}

export default ProtectedRoute