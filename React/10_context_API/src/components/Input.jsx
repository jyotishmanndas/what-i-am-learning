import React, { useContext, useState } from 'react'
import { nanoid } from 'nanoid';
import { Store } from '../context/Context';

const Input = () => {
    const [taskInput, setTaskInput] = useState("");
    const { setAllTask, allTask } = useContext(Store);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!taskInput.trim()) return;
        setAllTask([...allTask, { id: nanoid(), task: taskInput }]);
        localStorage.setItem("tasks", JSON.stringify([...allTask, { id: nanoid(), task: taskInput }]));
        setTaskInput("");
    }
    return (
        <form className='flex items-center gap-3' onSubmit={handleSubmit}>
            <input onChange={(e) => setTaskInput(e.target.value)} value={taskInput} className=' w-[20vw] px-4 py-3 border rounded-md' type="text" placeholder='Write something' />
            <button className='px-4 py-3 bg-black text-white rounded-md cursor-pointer active:scale-95 transition'>Add</button>
        </form>
    )
}

export default Input

