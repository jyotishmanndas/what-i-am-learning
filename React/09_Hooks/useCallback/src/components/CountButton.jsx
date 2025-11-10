import React, { memo } from 'react'

const CountButton = memo(({ onIncrement, onDecrement }) => {
    return (
        <div>
            <button onClick={onIncrement}>Increment</button>
            <button onClick={onDecrement}>Decrement</button>
        </div>
    )
})

export default CountButton
