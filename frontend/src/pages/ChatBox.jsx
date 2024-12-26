import React, { useEffect, useState } from "react";
import ScrollToBottom from 'react-scroll-to-bottom';
import './chatBox.css';

function ChatBox({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);


  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setCurrentMessage(""); // Reset input field
      setMessageList((list) => [...list, messageData]);
    }
  };

  useEffect(() => {
    const handleMessage = (data) => {
      // console.log(data);
      setMessageList((list) => [...list, data]);
    };

    socket.on("receive_message", handleMessage);

    return () => {
      socket.off("receive_message", handleMessage);
    };
  }, [socket]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>LIVE CHAT</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container"> 
        {messageList.map((messageContent) => {
          return (
            <div 
              className="message"
              id={username === messageContent.author ? "person1" : "person2"}
            >
              <div>
                <div className="message-content">
                  <p>{messageContent.message}</p>
                </div>
                <div className="message-meta">
                  <p id="author">{messageContent.author}</p>
                  <p id="time">{messageContent.time}</p>
                </div>
              </div>
            </div>
          )
        })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          placeholder="Type a message"
          value={currentMessage} // Bind input value to state
          onChange={(event) => setCurrentMessage(event.target.value)}

          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default ChatBox;
