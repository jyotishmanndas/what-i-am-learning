import React from 'react'
import { useEffect } from 'react';
import { useRef } from 'react'


// create a component with a text input field and a button. When the button component mounts or the button is clicked, automatically focus the text input field using useRef

const App = () => {

  const focusRef = useRef();

  useEffect(() => {
    if (!focusRef.current) return;
    focusRef.current.focus();
  })

  const handleClick = () => {
    focusRef.current.focus();
  }

  return (
    <div>
      <input ref={focusRef} type="text" placeholder='focus' />
      <button onClick={handleClick}>Focus input</button>
    </div>
  )
}

export default App
