import React, { useState } from 'react'
import { useSocket } from '../hooks/useSocket';

const Chat = () => {
    const [messageInp, setMessageInp] = useState("")
    const [messages, setMessages] = useState([]);

    const socketRef = useSocket();

    const SendMessage = () => {
        if (!socketRef.current) return;
        socketRef.current.emit("send-message", {})
    }

    return (
        <div className='h-screen bg-[#dadada] flex items-center justify-center'>
            <div className='min-w-xl bg-red-500 p-5'>
                <div className='h-64 border border-black'>

                </div>
                <div className='mt-4 flex items-center gap-4'>
                    <input onChange={(e) => setMessageInp(e.target.value)} type="text" value={messageInp} className='border w-full py-2 rounded-md' />
                    <button onClick={SendMessage} className='border rounded-md px-3 py-2 cursor-pointer'>Send</button>
                </div>
            </div>
        </div>
    )
}

export default Chat