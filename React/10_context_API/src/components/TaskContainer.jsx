import React, { useContext } from 'react'
import List from './List'
import { Store } from '../context/Context';

const TaskContainer = () => {
    const { allTask } = useContext(Store);
    return (
        <div className='h-72 w-[50%] border rounded-md p-5 flex flex-col items-center gap-3 overflow-y-auto'>
            {allTask.map((elem) => (
                <List key={elem.id} elem={elem} />
            ))}
        </div>
    )
}

export default TaskContainer