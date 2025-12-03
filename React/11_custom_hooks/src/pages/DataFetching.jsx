import React from 'react'
import { useTodos } from '../hooks/useTodos'
import UsersCard from '../components/UsersCard';

const DataFetching = () => {

    const { todos, loading } = useTodos();
    return (
        <div className='h-[80%] w-full flex flex-col items-center justify-center'>
            {loading ? (
                <div>
                    loading
                </div>
            ) : (
                <>
                    {todos.map((user) => (
                        <UsersCard key={user.id} user={user} />
                    ))}
                </>
            )}
        </div>
    )
}

export default DataFetching
