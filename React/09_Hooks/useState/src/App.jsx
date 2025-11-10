import { useState } from 'react'

function App() {
  const [title, setTitle] = useState("jyoti")

  function updateTitle() {
    setTitle(`my name is ${Math.random()}`)
  }

  return (
    <div>
      <button onClick={updateTitle}>Update the title</button>   {/* Every time button is onClick the App components re-renders */}
      <Header title={title}></Header>  {/* Every time button is clicked state is changed */}
      <Header title="jyotishman"></Header>    {/* Static data */}
    </div>
  )
}

function Header({ title }) {
  return <div>
    {title}
  </div>
}

export default App
