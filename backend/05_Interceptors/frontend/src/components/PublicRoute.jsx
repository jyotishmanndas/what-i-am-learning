import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router'

const PublicRoute = () => {
    const { user } = useSelector(state => state.auth);

    if (user) {
        return <Navigate to="/dashboard" />
    }

    return <Outlet />
}

export default PublicRoute