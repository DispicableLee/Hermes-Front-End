import * as React from "react";
import ConvoFrame from "./ConvoFrame";
import ChatSideBar from "./ChatSideBar";

function Chats({ convoData }) {
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
        <ChatSideBar />
      </aside>
      <ConvoFrame convoData={convoData} sendNewMessage={sendNewMessage} />
    </div>
  );
}

export default Chats;
