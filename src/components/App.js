import * as React from "react";
import { useState, useEffect } from "react";
// import { Switch, Route } from "react-router-dom";
import "../App.css";
import NavBar from "./NavBar";
import Main from "./Main";

function App() {
  const [user, setUser] = useState(null);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // auto-login
    fetch("http://localhost:3000/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => console.log(user));
      }
    });
  }, []);

  return (
    <div>
      <NavBar user={user} setUser={setUser} />
      <Main user={user} setUser={setUser} />
    </div>
  );
}

export default App;
