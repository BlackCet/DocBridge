import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

function ChatBox({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage.trim() !== "") {
      const messageData = {
        room,
        author: username,
        message: currentMessage,
        time: new Date(Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      await socket.emit("send_message", messageData);
      setCurrentMessage(""); // Reset input field
      setMessageList((list) => [...list, messageData]); // Update the message list
    }
  };

  useEffect(() => {
    const handleMessage = (data) => {
      setMessageList((list) => [...list, data]);
    };

    socket.on("receive_message", handleMessage);

    // Cleanup event listener on component unmount
    return () => {
      socket.off("receive_message", handleMessage);
    };
  }, [socket]);

  return (
    <div className="flex items-center justify-center h-screen bg-beigelight">
      <div className="flex flex-col w-full h-2/3 bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-navydark p-4 text-center">
          <p className="text-beigelight text-2xl font-bold">LIVE CHAT</p>
        </div>
        <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4">
          <ScrollToBottom className="flex flex-col space-y-4">
            {messageList.map((messageContent, index) => (
              <div
                key={index}
                className={`flex flex-col max-w-[70%] mb-4 ${
                  username === messageContent.author
                    ? "self-start bg-beigedark rounded-tl-lg rounded-br-lg p-3 shadow-md"
                    : "self-end bg-navydark text-beigelight rounded-tr-lg rounded-bl-lg p-3 shadow-md"
                }`}
              >
                <div className="text-lg break-words">
                  <p>{messageContent.message}</p>
                </div>
                <div className="flex justify-between px-2 text-xs text-gray-600 mt-1">
                  <p className="font-semibold">{messageContent.author}</p>
                  <p>{messageContent.time}</p>
                </div>
              </div>
            ))}
          </ScrollToBottom>
        </div>
        <div className="flex gap-2 p-4 bg-navydark">
          <input
            type="text"
            placeholder="Type a message"
            value={currentMessage}
            onChange={(event) => setCurrentMessage(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") sendMessage(); // Send message on Enter key press
            }}
            className="flex-1 p-4 border-2 border-beigedark rounded-lg bg-navylight text-beigelight text-lg focus:outline-none focus:border-beigelight transition duration-300"
          />
          <button
            onClick={sendMessage}
            className="bg-beigedark text-navydark p-4 px-6 rounded-lg font-semibold text-lg cursor-pointer hover:bg-beigelight hover:text-navylight transition duration-300"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatBox;
