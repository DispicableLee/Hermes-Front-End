import * as React from "react";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import "../App.css";
import NavBar from "./NavBar";
import Main from "./Main";

function App() {

  // const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <div>
      <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
      <Main isLoggedIn={isLoggedIn} />
    </div>
  );
}

export default App;
