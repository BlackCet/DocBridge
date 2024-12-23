
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Chat() {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('JavaScript');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Navigate to the ChatBox component with the username and room as query parameters
    navigate(`/chatbox?username=${username}&room=${room}`);
  };

  return (
    <div className="join-container">
      <header className="join-header">
        <h1>
          <i className="fas fa-smile"></i> ChatCord
        </h1>
      </header>
      <main className="join-main">
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Enter username..."
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label htmlFor="room">Room</label>
            <select
              name="room"
              id="room"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
            >
              <option value="JavaScript">JavaScript</option>
              <option value="Python">Python</option>
              <option value="PHP">PHP</option>
              <option value="C#">C#</option>
              <option value="Ruby">Ruby</option>
              <option value="Java">Java</option>
            </select>
          </div>
          <button type="submit" className="btn">
            Join Chat
          </button>
        </form>
      </main>
    </div>
  );
}

export default Chat;
