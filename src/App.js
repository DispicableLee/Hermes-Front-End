import * as React from "react";
import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import ConvoFrame from "./components/ConvoFrame";
import SideBar from './components/SideBar';
import Login from './components/Login';

function App() {
  const [convoData, setConvoData] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/conversations/3")
      // must change to sessions ID
      .then((res) => res.json())
      .then((data) => setConvoData(data))
  }, [])

  function logUserIn(userObj) {
    console.log('loggin in')
    // fetch("http://localhost:3000/")
  }

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

  return (
    <div>
      <NavBar isLoggedIn={isLoggedIn} />
      {isLoggedIn ?
      <div>
        <aside style={{ float: 'left' }}>
          <SideBar />
        </aside>
        <ConvoFrame convoData={convoData} sendNewMessage={sendNewMessage} />
      </div>
      : <Login logUserIn={logUserIn} />}
    </div>
  );
}

export default App;
