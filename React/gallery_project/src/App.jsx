import React, { Suspense, useEffect, useState } from 'react'
import Card from './components/Card';
import Button from './components/Button';

const App = () => {

  const [image, setImage] = useState([]);
  const [page, setpage] = useState(1)

  useEffect(() => {
    fetch(`https://picsum.photos/v2/list?page=${page}&limit=15`)
      .then(res => res.json())
      .then(data => setImage(data))
  }, [page]);

  return (
    <div className='h-screen bg-black w-full'>
      <div className='grid grid-cols-5 gap-4 p-5'>
        {image.map((item, idx) => (
          <Card item={item} key={idx} />
        ))}
      </div>

      <Button setpage={setpage} page={page} />
    </div>
  )
}

export default App
