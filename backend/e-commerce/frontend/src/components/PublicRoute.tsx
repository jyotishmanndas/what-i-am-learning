import { useAppSelector } from '@/hooks/useRedux'
import React from 'react'
import { Navigate, Outlet } from 'react-router';

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
    const { user } = useAppSelector(state => state.auth);
    if (user) {
        return <Navigate to="/home" />
    };

    return (
        <>
            {children}
        </>
    )
}

export default PublicRoute