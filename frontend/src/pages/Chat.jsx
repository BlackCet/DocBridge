import io from "socket.io-client";
import ChatBox from "./Chatbox";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const socket = io.connect("http://localhost:4000");

function Chat() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username.trim() !== "" && room.trim() !== "") {
      socket.emit("join_room", room);
      setShowChat(true); // Show chat box after joining
    }
  };

  return (
    <div className="App min-h-screen bg-beigelight flex flex-col">
      {/* Conditionally render Navbar and Footer based on showChat */}
      {!showChat && <Navbar />}

      {/* Main content area for chat */}
      <main className="flex-grow flex items-center justify-center">
        {!showChat ? (
          <div className="joinChatContainer bg-white p-8 rounded-lg shadow-xl w-full sm:w-96">
            <h3 className="text-2xl font-semibold mb-6 text-center text-navydark">Join a Chat</h3>
            <input
              type="text"
              placeholder="Username"
              className="w-full p-3 mb-4 border border-gray-300 rounded-md bg-beigelight"
              onChange={(event) => setUsername(event.target.value)}
            />
            <input
              type="text"
              placeholder="Room ID"
              className="w-full p-3 mb-6 border border-gray-300 rounded-md bg-beigelight"
              onChange={(event) => setRoom(event.target.value)}
            />
            <button
              onClick={joinRoom}
              className="w-full p-3 bg-navylight text-white rounded-md hover:bg-navydark transition duration-300"
            >
              Join Room
            </button>
          </div>
        ) : (
          <ChatBox socket={socket} username={username} room={room} />
        )}
      </main>

      {/* Conditionally render Footer based on showChat */}
      {!showChat && <Footer />}
    </div>
  );
}

export default Chat;
