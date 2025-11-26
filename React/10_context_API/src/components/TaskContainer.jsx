import React, { useContext } from 'react'
import List from './List'
import { Store } from '../context/Context';

const TaskContainer = () => {
    const { allTask } = useContext(Store);
    return (
        <div className='w-full max-w-2xl max-h-96 bg-gray-50 border border-gray-200 rounded-lg p-5 flex flex-col items-center gap-3 overflow-y-auto shadow-sm'>
          {allTask.length > 0 ? (
            <>
              {allTask.map((elem) => (
                <List key={elem.id} elem={elem} />
            ))}
            </>
          ): (
            <div className='flex items-center justify-center h-full'>
                <div className='text-center'>
                  <h2 className='font-semibold text-xl text-gray-700 mb-2'>No tasks yet</h2>
                  <p className='text-gray-400 text-sm'>Add a task to get started</p>
                </div>
            </div>
          )}
        </div>
    )
}

export default TaskContainer