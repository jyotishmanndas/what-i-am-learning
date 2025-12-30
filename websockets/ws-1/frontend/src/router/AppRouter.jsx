import React from 'react'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import CreateRoom from '../pages/CreateRoom';

const AppRouter = () => {
    const router = createBrowserRouter([
        {
            path: "/create-room",
            element: <CreateRoom />
        }
    ])

    return (
        <RouterProvider router={router} />
    )
}

export default AppRouter