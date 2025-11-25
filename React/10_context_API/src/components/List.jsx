import React, { useContext, useState } from 'react'
import { Trash2, Edit } from "lucide-react"
import { Store } from '../context/Context';

const List = ({ elem }) => {
  const [toogle, setToggle] = useState(false);
  const [value, setValue] = useState("");
  const { allTask, setAllTask } = useContext(Store);

  const handleDelete = () => {
    const dlt = allTask.filter((x) => x.id !== elem.id);
    localStorage.setItem("tasks", JSON.stringify(dlt));
    setAllTask(dlt);
  }

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!value.trim()) return;

    const updatedTasks = allTask.map((task) => task.id === elem.id ? { ...task, task: value } : task);
    setAllTask(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setToggle(false);
  }

  return (
    <div className='w-full h-14 bg-green-300 rounded-md p-4 flex items-center justify-between'>
      <h2 className='font-medium text-xl'>{elem.task}</h2>
      <div className='flex gap-3'>
        {toogle ? (
          <form onSubmit={handleUpdate} className='w-full flex items-center gap-3'>
            <input onChange={(e) => setValue(e.target.value)} value={value} className='w-full px-3 py-2 border rounded-md' type="text" />
            <button className='px-3 py-2 bg-amber-300 rounded-md cursor-pointer'>Update</button>
          </form>
        ) : (
          <button onClick={() => {
            setToggle(true);
            setValue(elem.task)
          }} className='px-3 py-2 bg-blue-400 rounded-md cursor-pointer flex items-center gap-2 active:scale-95 transition'>
            <Edit className='h-4 w-4' />
            Edit
          </button>
        )}
        <button onClick={handleDelete} className='px-3 py-2 bg-red-300 rounded-md cursor-pointer flex items-center gap-2 active:scale-95 transition'>
          <Trash2 className='w-4 h-4' />
          Delete
        </button>
      </div>
    </div>
  )
}

export default List
