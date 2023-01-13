import './App.css';
import io from "socket.io-client";
import React  from 'react';
import { useState, useEffect } from 'react';

const socket = io('http://localhost:4000')


  
  




function App() {

  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([{
    body: "this is a message",
    from: "user1"
  }])

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit('message', message)
    const newMessage = {
      body: message,
      from: "Me"
    }
    setMessages([newMessage, ...messages]);
    setMessage("");
    
  }

  useEffect(() => {
    const reciveMessage = message => {
      setMessages([message, ...messages])
    }
    socket.on('message', reciveMessage);


    return () => {
      socket.off('message', reciveMessage)
    }



  }, [messages])

  return (
    
    <div className="h-screen bg-zinc-800 text-white">
      
      <form onSubmit={handleSubmit} className="bg-zinc-900 p-10">
        <input type="text" onChange={e => setMessage(e.target.value)} value={message} />
        <button>send</button>
      </form>

      {messages.map((message, index) => (
        <div key={index}>
          <p>{message.from} : {message.body}</p>
        </div>
      ))}
    </div>
    
  );
}

export default App;
