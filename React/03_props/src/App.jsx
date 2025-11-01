import React from 'react'
import Card from './components/Card'

const App = () => {
  return (
    <div className='parent'>
      <Card name="Jyotishman" about="Lorem ipsum dolor sit amet, consectetur adipisicing elit." src="https://plus.unsplash.com/premium_photo-1761430187310-3a53c9eb70cc?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDF8SnBnNktpZGwtSGt8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=60&w=600" />

      <Card name="Rita" about="Lorem ipsum dolor sit amet, consectetur adipisicing elit." src="https://plus.unsplash.com/premium_photo-1761667829007-92a3d3a44b8f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDh8TThqVmJMYlRSd3N8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=60&w=600" />
    </div>
  )
}

export default App