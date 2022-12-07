import React, { useEffect, useState } from "react";
import ConvoFrame from "./ConvoFrame";
import ChatSideBar from "./ChatSideBar";


function Chats({ user, convoData, getConversations, reRun, setReRun }) {

  const [selectedChat, setSelectedChat] = useState(convoData[0]);

  useEffect(() => getConversations(), [selectedChat])

  function renderConversation(selectedConvoId) {
    const selectedConvo = convoData.find(convo => (convo.id === selectedConvoId))
    setSelectedChat(selectedConvo)
  }

  function sendNewMessage(message) {
    fetch("/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        conversation_id: selectedChat.id,
        content: message,
      }),
    }).then(res => res.json())
      .then(newMessage => {
        setSelectedChat({ ...selectedChat, messages: [...selectedChat.messages, newMessage] })
      })
      .catch(err => console.error(err));
  }

  function deleteMessage(deletedMsgID) {
    fetch(`/messages/${deletedMsgID}`, { method: "DELETE" })
    setSelectedChat({
      ...selectedChat,
      messages: selectedChat.messages.filter(msg => msg.id !== deletedMsgID)
    })
  }

  function postUpdatedMessage(updatedMsg) {
    fetch(`/messages/${updatedMsg.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: updatedMsg.content
      })
    })
      .then(r => r.json())
      .then(resMsg => {
        setSelectedChat({
          ...selectedChat,
          messages: selectedChat.messages.map(msgObj => {
            return msgObj.id === updatedMsg.id ? updatedMsg : msgObj
          })
        })
      })
  }

  return (
    <div>
      <aside style={{
        float: "left"
      }}>
        <ChatSideBar convoData={convoData} renderConversation={renderConversation} />
      </aside>
      <ConvoFrame
        user={user}
        selectedChat={selectedChat}
        sendNewMessage={sendNewMessage}
        deleteMessage={deleteMessage}
        postUpdatedMessage={postUpdatedMessage}
      />
    </div>
  );
}

export default Chats;
