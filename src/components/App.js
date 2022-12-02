import * as React from "react";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import "../App.css";
import NavBar from "./NavBar";
import Main from "./Main";

function App() {

  // const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("user-token") ? true : false);

 

  return (
    <div>
      <NavBar isLoggedIn={isLoggedIn} />
      <Main isLoggedIn={isLoggedIn} />
    </div>
  );
}

export default App;
