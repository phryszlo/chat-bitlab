import React from 'react'

const ChatMessage = ({ name, message }) => {
  // console.log(`chat message say: name: ${name}, message: ${message}`);
  return (
    <p className="chat-message">
      <strong>{name}</strong> <em>{message}</em>
    </p>
  )
}

export default ChatMessage