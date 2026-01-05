import React from 'react'
import { useForm } from "react-hook-form"
import { useSocket } from '../hooks/useSocket';
import { useNavigate } from "react-router"

const CreateRoom = () => {
    const { register, handleSubmit, reset } = useForm();
    const navigate = useNavigate()

    const socketRef = useSocket();

    const onsubmit = (data) => {
        console.log(data.roomId);
        socketRef.current.emit("join-room", data.roomId);
        navigate("/chat")
        reset()
    }

    return (
        <div className='h-screen bg-neutral-200 flex items-center justify-center'>
            <div className='p-5 w-full max-w-md bg-white rounded-md shadow-md'>
                <h2 className='text-2xl font-medium  mb-5'>Create a room</h2>
                <form onSubmit={handleSubmit(onsubmit)}>
                    <div>
                        <input
                            {...register("roomId", { required: true })}
                            type="text"
                            className="w-full px-4 py-2 rounded-lg border border-gray-300"
                            placeholder="Enter your roomId"
                        />
                    </div>

                    <button type='submit' className='border px-4 py-1 rounded-lg cursor-pointer mt-5 ml-auto block'>
                        Join
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CreateRoom