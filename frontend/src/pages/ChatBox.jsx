import React, { useState } from 'react';
import './style.css'; // Make sure your CSS is in the same directory or update the path accordingly

const ChatApp = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { username: 'Brad', time: '9:12pm', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, repudiandae.' },
    { username: 'Mary', time: '9:15pm', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, repudiandae.' }
  ]);
  const users = ['Brad', 'John', 'Mary', 'Paul', 'Mike'];
  const roomName = 'JavaScript';

  // Handle message input change
  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  // Handle sending a message
  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      const newMessage = {
        username: 'You', // Replace with the actual username if needed
        time: new Date().toLocaleTimeString(),
        text: message
      };
      setMessages([...messages, newMessage]);
      setMessage(''); // Clear the input after sending
    }
  };

  return (
    <div className="chat-container">
      <header className="chat-header">
        <h1><i className="fas fa-smile"></i> ChatCord</h1>
        <button className="btn" onClick={() => alert('Leave Room clicked')}>Leave Room</button>
      </header>

      <main className="chat-main">
        <div className="chat-sidebar">
          <h3><i className="fas fa-comments"></i> Room Name:</h3>
          <h2>{roomName}</h2>
          <h3><i className="fas fa-users"></i> Users</h3>
          <ul id="users">
            {users.map((user, index) => (
              <li key={index}>{user}</li>
            ))}
          </ul>
        </div>

        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div className="message" key={index}>
              <p className="meta">{msg.username} <span>{msg.time}</span></p>
              <p className="text">{msg.text}</p>
            </div>
          ))}
        </div>
      </main>

      <div className="chat-form-container">
        <form id="chat-form" onSubmit={handleSubmit}>
          <input
            id="msg"
            type="text"
            placeholder="Enter Message"
            value={message}
            onChange={handleInputChange}
            required
            autoComplete="off"
          />
          <button type="submit" className="btn">
            <i className="fas fa-paper-plane"></i> Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatApp;
