import React, { useContext, useState } from 'react'
import { nanoid } from 'nanoid';
import { Store } from '../context/Context';
import { toast } from 'react-toastify';

const Input = () => {
    const [taskInput, setTaskInput] = useState("");
    const { setAllTask, allTask } = useContext(Store);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!taskInput.trim()) return;
        setAllTask([...allTask, { id: nanoid(), task: taskInput }]);
        localStorage.setItem("tasks", JSON.stringify([...allTask, { id: nanoid(), task: taskInput }]));
        toast.success("Created successfully")
        setTaskInput("");
    }
    return (
        <form onSubmit={handleSubmit} className='flex items-center gap-3 flex-wrap justify-center'>
            <input
                onChange={(e) => setTaskInput(e.target.value)}
                value={taskInput}
                className='w-full md:w-[25vw] px-5 py-3 bg-gray-50 border border-gray-300 rounded-lg text-black font-medium placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent transition'
                type="text"
                placeholder='Add a new task...'
            />
            <button className='px-6 py-3 bg-black text-white font-semibold rounded-lg cursor-pointer hover:bg-gray-800 active:scale-95 transition shadow-md'>Add Task</button>
        </form>
    )
}

export default Input

