import * as React from "react";
import { useState, useEffect } from "react";
// import { Switch, Route } from "react-router-dom";
import "../App.css";
import NavBar from "./NavBar";
import Main from "./Main";

function App() {
  const [user, setUser] = useState(null);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  const autoLogin = () => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then(user => {
          console.log(user)
          setUser(user)
        });
      }
    });
  }

  useEffect(() => {
    autoLogin()
  }, [])

  return (
    <div>
      <NavBar user={user} setUser={setUser} />
      <Main user={user} setUser={setUser} autoLogin={autoLogin} />
    </div>
  );
}


export default App;
