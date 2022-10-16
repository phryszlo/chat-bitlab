import PropTypes from 'prop-types';
import { useState } from 'react';

const ChatInput = ({ onSubmitMessage }) => {
  const [message, setMessage] = useState('');
  return (
    <main className="chat-input">
      <form
        action="."
        className="chat-form"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmitMessage(message);
          setMessage('');
        }}>
        <input
          type="text"
          className="chat-input"
          placeholder={'Enter message...'}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value)
          }} />
        <input
          type="submit"
          className="chat-submit"
          value={"Send"} />
      </form>
    </main>
  )
}

export default ChatInput;