import React, { useEffect, useRef } from 'react'
import { io } from "socket.io-client";


export const useSocket = () => {
    const socketRef = useRef(null);

    useEffect(() => {
        socketRef.current = io("http://localhost:5000", {
            withCredentials: true
        })

        socketRef.current.on("connect", () => {
            console.log("socket connected", socketRef.current.id);
        })

        socketRef.current.on("disconnect", () => {
            console.log("Socket disconnected");
        })

        return () => {
            socketRef.current.off();       // remove all listeners
            socketRef.current.disconnect();
        };

    }, [])

    return socketRef
}