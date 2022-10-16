import { useEffect, useState } from "react";
import ChatInput from "./ChatInput";
import ChatMessage from './ChatMessage'

const URL = "ws://localhost:3030";

const Chat = (props) => {
  const [name, setName] = useState('Bob');
  const [messages, setMessages] = useState([]);
  const [ws, setWs] = useState(new WebSocket(URL));

  // const ws = new WebSocket(URL);

  useEffect(() => {
    ws.onopen = () => {
      console.log('Chat.js useEffect []:  connected');
    }
    ws.onmessage = (evt) => {
      const message = JSON.parse(evt.data);
      console.log(`message: ${JSON.stringify(message)}`);
      addMessage(message)
    }

    ws.onclose = () => {
      console.log(`Chat.js useEffect []: disconnected`);
      setWs(new WebSocket(URL))
    }

  }, [])

  useEffect(() => {
    messages.map((message, index) => {
      console.log(`${index}: ${message.message}`)
    })
    console.log(`effect: ${JSON.stringify(messages)}`);

  },[messages])


  // ♾️♾️♾️♾️♾️
  const addMessage = (message) => {
    console.log(`addMessage: ${JSON.stringify(message)}`);
    // message form: {name: name, message: messageString}
    setMessages(messages => [message, ...messages])
    console.log(`addMessage 2: ${JSON.stringify(messages)}`);
  }

  const submitMessage = (messageString) => {
    const message = { name: name, message: messageString }
    // addMessage(message)
    ws.send(JSON.stringify(message), false)
  }

  return (
    <div className="chat">
      <label className="chat-label" htmlFor="name">
        Name:
        <input
          id={'name'}
          type="text"
          className="chat-input"
          placeholder={'Enter your name...'}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <ChatInput
        ws={ws}
        onSubmitMessage={(messageString) => submitMessage(messageString)}
      />

      {
        messages.map((message, index) => {
          setTimeout(() => {
            console.log('map:' ,JSON.stringify(message))

          }, 100)
          return (
            // message && message.name ?
            <ChatMessage
              key={index}
              message={message.message}
              name={message.name}
            />
            // :
            // ''
          )
        })
      }
    </div>
  )
}

export default Chat;