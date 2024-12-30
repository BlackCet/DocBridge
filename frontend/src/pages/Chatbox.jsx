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
        time: new Date(Date.now()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
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
    <div className="flex items-center justify-center h-screen w-screen bg-beigelight">
      <div className="flex flex-col w-full h-full bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-navydark p-4 text-center">
          <p className="text-beigelight text-2xl font-bold">LIVE CHAT</p>
        </div>
        <div className="flex-1 p-4 overflow-y-auto">
          <ScrollToBottom className="flex flex-col space-y-4">
            {messageList.map((messageContent, index) => (
              <div
                key={index}
                className={`chat ${username === messageContent.author ? "chat-end" : "chat-start"}`}
              >
                <div
                  className={`chat-bubble rounded-lg p-4 ${
                    username === messageContent.author
                      ? "bg-beigedark text-navydark"
                      : "bg-navylight text-beigelight"
                  } shadow-md`}
                >
                  <p className="text-lg leading-relaxed">{messageContent.message}</p>
                  <div
                    className={`text-xs mt-2 flex justify-between ${
                      username === messageContent.author ? "text-navylight" : "text-beigelight"
                    }`}
                  >
                    <span className="mr-2">{messageContent.author}</span>
                    <span className="ml-2">{messageContent.time}</span>
                  </div>
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
