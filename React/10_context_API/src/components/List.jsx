import React, { useContext, useState } from 'react'
import { Trash2, Edit } from "lucide-react"
import { Store } from '../context/Context';
import { toast } from 'react-toastify';

const List = ({ elem }) => {
  const [toogle, setToggle] = useState(false);
  const [value, setValue] = useState("");
  const { allTask, setAllTask } = useContext(Store);

  const handleDelete = () => {
    const dlt = allTask.filter((x) => x.id !== elem.id);
    localStorage.setItem("tasks", JSON.stringify(dlt));
    setAllTask(dlt);
    toast.success("Delete successfully")
  }

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!value.trim()) return;

    const updatedTasks = allTask.map((task) => task.id === elem.id ? { ...task, task: value } : task);
    setAllTask(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    toast.success("Updated successfully")
    setToggle(false);
  }

  return (
    <div className='w-full bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between shadow-xs hover:shadow-sm transition-shadow'>
      <h2 className='font-semibold text-black text-lg flex-1 truncate'>{elem.task}</h2>
      <div className='flex gap-2 ml-4'>
        {toogle ? (
          <form onSubmit={handleUpdate} className='flex items-center gap-2'>
            <input 
              onChange={(e) => setValue(e.target.value)} 
              value={value} 
              className='px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-1 focus:ring-black' 
              type="text" 
            />
            <button className='px-4 py-2 bg-black hover:bg-gray-800 text-white font-semibold rounded-md cursor-pointer active:scale-95 transition'>Save</button>
          </form>
        ) : (
          <button onClick={() => {
            setToggle(true);
            setValue(elem.task)
          }} className='px-4 py-2 bg-gray-200 hover:bg-gray-300 text-black font-semibold rounded-md cursor-pointer flex items-center gap-2 active:scale-95 transition'>
            <Edit className='h-4 w-4' />
           Edit
          </button>
        )}
        <button onClick={handleDelete} className='px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-md cursor-pointer flex items-center gap-2 active:scale-95 transition'>
          <Trash2 className='w-4 h-4' />
         Delete
        </button>
      </div>
    </div>
  )
}

export default List
