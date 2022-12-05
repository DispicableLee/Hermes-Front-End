import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button"
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";

function SignUp({ setUser }) {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    passwordConfirm: "",
    email: "",
    avatar: ""
  });
  const navigate = useNavigate();

  function handleChange(e) {
    setUserData({ ...userData, [e.target.name]: e.target.value })
    // console.log(userData)
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setUser(user);
          setUserData({
            username: "",
            password: "",
            passwordConfirm: "",
            email: "",
            avatar: ""
          })
          navigate("/chats");
        });
      }
    });
  }

  return (
    <div>
      <Card>
        <CardHeader title="Create an Account" />
        <CardContent>
          <form onSubmit={handleSubmit}
            style={{
              margin: "0 30% 0 30%",
              maxWidth: "50%",
            }}
          >
            <TextField
              variant="outlined"
              type="text"
              label="Username"
              autoComplete="off"
              name="username"
              value={userData.username}
              onChange={(e) => handleChange(e)}
            />
            <br />
            <TextField
              variant="outlined"
              type="text"
              label="Email"
              name="email"
              autoComplete="off"
              value={userData.email}
              onChange={(e) => handleChange(e)}
            />
            <br />
            <TextField
              variant="outlined"
              type="password"
              name="password"
              label="Password"
              value={userData.password}
              onChange={(e) => handleChange(e)}
              autoComplete="current-password"
            />
            <br />
            <TextField
              variant="outlined"
              type="password"
              name="passwordConfirm"
              label="Confirm Password"
              value={userData.passwordConfirm}
              onChange={(e) => handleChange(e)}
              autoComplete="current-password"
            />
            <br />
            <Button variant="contained" type="submit">Sign Up</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default SignUp;
