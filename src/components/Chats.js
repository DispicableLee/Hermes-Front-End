import * as React from "react";
import ConvoFrame from "./ConvoFrame";
import ChatSideBar from './ChatSideBar';

function Chats({ convoData }) {

    function sendNewMessage(message) {
        console.log("In App: ", message)

        fetch("http://localhost:3000/messages/", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
            },
            body: JSON.stringify({
            user_id: "", // whoever is logged in right now
            conversation_id: "", // 
            content: message
            })
        })
    }
    
    return(
        <div>
            <aside style={{ float: 'left' }}>
                <ConvoFrame convoData={convoData} sendNewMessage={sendNewMessage} />
                <ChatSideBar />
            </aside>
        </div>
    )
}

export default Chats;