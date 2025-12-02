import React from 'react'
import { useTodos } from './hooks/useTodos'
import UsersCard from './components/UsersCard';

const App = () => {
  const { todos, loading } = useTodos();
  return (
    <div>

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

export default App
