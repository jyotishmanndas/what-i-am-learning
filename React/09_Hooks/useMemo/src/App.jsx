import React from 'react'
import { useMemo } from 'react';
import { useState } from 'react';

const words = ["hi", "my", "name", "is", "random", "for", "to", "my"];
const Total_Lines = 100;
const All_Words = [];

for (let i = 1; i < Total_Lines; i++) {
  let sentence = "";
  for (let j = 1; j < words.length; j++) {
    sentence += (words[Math.floor(Math.random() * words.length)])
    sentence += " "
  }
  All_Words.push(sentence)
}

const App = () => {
  const [filter, setFilter] = useState("");

  const filteredSentence = useMemo(() => {
    return All_Words.filter((x) => x.includes(filter))
  }, [filter])

  return (
    <div>
      <input onChange={(e) => {
        setFilter(e.target.value)
      }} type="text" placeholder='Enter anything' />

      {filteredSentence.map((w) => (
        <p>{w}</p>
      ))}
    </div>
  )
}

export default App