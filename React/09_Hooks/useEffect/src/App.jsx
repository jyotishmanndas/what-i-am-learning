import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useEffect } from 'react'
import Todo from './components/Todo'

function App() {
  const [todos, setTodo] = useState([])

  useEffect(() => {
    setInterval(() => {
      fetch(`https://sum-server.100xdevs.com/todos`)
        .then(async (res) => {
          const json = await res.json();
          setTodo(json.todos)
        })
    }, 1000)
  }, [])

  return (
    <div>
      {todos.map((todo) => {
        return <Todo key={todo.id} title={todo.title} description={todo.description}></Todo>
      })}
    </div>
  )
}
export default App
