import React, { useEffect, useRef, useState } from 'react'
import { io } from "socket.io-client";

const App = () => {
  const socketRef = useRef(null);
  const [value, setValue] = useState("");
  const [message, setMessage] = useState([]);

  useEffect(() => {
    socketRef.current = io("http://localhost:3000");

    socketRef.current.on("connect", () => {
      console.log(socketRef.current.id);
    });

    socketRef.current.on("chat-message", (msg) => {
      setMessage(prev => [...prev, msg])
    })

    return () => {
      socketRef.current.disconnect()
    }

  }, []);

  const handleClick = () => {
    if (!socketRef.current) return;
    socketRef.current.emit("message", value);
    setValue("")
  }

  return (
    <div>
      <input onChange={(e) => setValue(e.target.value)} type="text" value={value} />
      <button onClick={handleClick}>Send</button>
      {message.map((m, i) => (
        <div key={i}>
          {m}
        </div>
      ))}
    </div>
  )
}

export default App