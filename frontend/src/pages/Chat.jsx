import io from "socket.io-client";
import ChatBox from './ChatBox';
import './chat.css';


import { useState } from "react";

const socket = io.connect("http://localhost:4000");

function Chat(){

  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);


  const joinRoom = () => {
    if(username !== "" && room !==""){
      socket.emit("join_room", room);
      setShowChat(true);
    }
  }
  return <div className="App">
    {!showChat ? (
    <div className="joinChat Container">
    <h3>JOIN A CHAT</h3>
    <input type="text" placeholder="Username" onChange={(event) => {
      setUsername(event.target.value);
    }} />
    <input type="text" placeholder="Room ID"  onChange={(event) => {
      setRoom(event.target.value);
    }} />
    <button onClick={joinRoom}>Join a Room</button>
    </div>
    ): (
    <ChatBox socket={socket} username={username} room={room} />
  )}
  </div>
}

export default Chat;