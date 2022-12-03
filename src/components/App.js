import * as React from "react";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import "../App.css";
import NavBar from "./NavBar";
import Main from "./Main";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Main isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
    </div>
  );
}

export default App;
