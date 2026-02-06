import { useAppSelector } from '@/hooks/useRedux'
import React from 'react'
import { Navigate, Outlet } from 'react-router';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { user, loading } = useAppSelector(state => state.auth);
    if (!user) {
        return <Navigate to="/login" />
    }
    return (
        <>
            {children}
        </>
    )
}

export default ProtectedRoute