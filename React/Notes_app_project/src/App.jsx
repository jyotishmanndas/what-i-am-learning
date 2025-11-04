import React, { useEffect, useState } from 'react'
import { X } from "lucide-react"

const App = () => {

  const [notes, setNotes] = useState([]);
  const [inputValue, setInputValue] = useState({
    title: "",
    description: ""
  });

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes"));
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.title || !inputValue.description) return;
    setNotes([...notes, inputValue]);
    localStorage.setItem("notes", JSON.stringify([...notes, inputValue]))
    setInputValue({
      title: "",
      description: ""
    })
  }
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4'>
      <form onSubmit={(e) => {
        handleSubmit(e)
      }} className='flex flex-col items-center justify-center gap-3'>
        <input value={inputValue.title} onChange={(e) => {
          setInputValue({
            ...inputValue,
            title: e.target.value
          })

        }} type="text" placeholder='Note Title' className='p-3 border border-gray-300 rounded-md font-medium' />
        <textarea value={inputValue.description} onChange={(e) => {
          setInputValue({
            ...inputValue,
            description: e.target.value
          })
        }} name="" placeholder='Enter your notes' className='p-3 border border-gray-300 rounded-md'></textarea>

        <button type="submit" className='px-4 py-2 bg-black text-white rounded-md cursor-pointer active:scale-95'>Save note</button>
      </form>

      <div className='mt-5 flex flex-wrap items-center justify-center gap-5'>
        {notes.map((note, idx) => (
          <div key={idx} className='h-60 w-56 bg-transparent border border-gray-300 rounded-lg p-4 hover:shadow-md transition-shadow duration-300 relative'>
            <h3 className='font-semibold text-2xl'>{note.title}</h3>
            <p className='text-gray-500'>{note.description}</p>
            <button onClick={() => {
              const filteredNotes = notes.filter((_, index) => index !== idx);
              setNotes(filteredNotes);
              localStorage.setItem("notes", JSON.stringify(filteredNotes))
            }}>
              <X className='absolute text-gray-500 h-3 w-3 top-2 right-2 cursor-pointer active:scale-95' />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App