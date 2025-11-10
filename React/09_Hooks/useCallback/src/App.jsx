import React, { useState } from 'react'
import CountButton from './components/CountButton';
import { useCallback } from 'react';

const App = () => {
  const [count, setCount] = useState(0);

  const Increment = useCallback(() => {
    return setCount((prev) => prev + 1)
  }, [])

  const Decrement = useCallback(() => {
    return setCount((prev) => prev - 1)
  }, [])

  return (
    <div>
      Counter {count}
      <CountButton onIncrement={Increment} onDecrement={Decrement} />
    </div>
  )
}

export default App
