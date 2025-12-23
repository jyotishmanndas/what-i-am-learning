import React, { useEffect } from 'react'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Login from '../components/Login';
import Register from '../components/Register';
import Dashboard from '../pages/Dashboard';
import { axiosInstance } from '../config/axiosInstance';
import { useDispatch } from "react-redux"
import { setUser } from '../features/authSlice';
import PublicRoute from '../components/PublicRoute';
import ProtectedRoute from '../components/ProtectedRoute';

const AppRouter = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        axiosInstance.get("/api/v1/user/auth/me")
            .then(res => dispatch(setUser(res.data.user)))
            .catch(() => setUser(null))
    }, [])

    const router = createBrowserRouter([
        {
            path: "/",
            element: <PublicRoute />,
            children: [
                {
                    path: "login",
                    element: <Login />
                },
                {
                    path: "register",
                    element: <Register />
                }
            ]
        },
        {
            path: "/dashboard",
            element: <ProtectedRoute />,
            children: [
                {
                    index: true,
                    element: <Dashboard />
                }
            ]
        }
    ])


    return (
        <RouterProvider router={router} />
    )
}

export default AppRouter