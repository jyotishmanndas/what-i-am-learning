import React from 'react'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import CreateRoom from '../pages/CreateRoom';
import Login from '../components/forms/Login';
import Register from '../components/forms/Register';
import Chat from '../pages/Chat';

const AppRouter = () => {
    const router = createBrowserRouter([
        {
            path: "/login",
            element: <Login />
        },
        {
            path: "/register",
            element: <Register />
        },
        {
            path: "/create-room",
            element: <CreateRoom />
        },
        {
            path: "/chat",
            element: <Chat />
        }
    ])

    return (
        <RouterProvider router={router} />
    )
}

export default AppRouter