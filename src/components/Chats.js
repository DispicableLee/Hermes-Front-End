import React, { useState } from "react";
import ConvoFrame from "./ConvoFrame";
import ChatSideBar from "./ChatSideBar";


function Chats({ convoData }) {
  const [selectedChat, setSelectedChat] = useState(convoData[0])

  function renderConversation(selectedConvoId) {
    const selectedConvo = convoData.find(convo => (convo.id === selectedConvoId))
    setSelectedChat(selectedConvo)
  }

  function sendNewMessage(message) {
    console.log("In App: ", message);

    fetch("/messages/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        user_id: "", // whoever is logged in right now
        conversation_id: "", //
        content: message,
      }),
    });
  }

  return (
    <div>
      <aside style={{
        float: "left"
      }}>
      <ChatSideBar convoData={convoData} renderConversation={renderConversation} />
      </aside>
      <ConvoFrame selectedChat={selectedChat} sendNewMessage={sendNewMessage} />
    </div>
  );
}

export default Chats;
