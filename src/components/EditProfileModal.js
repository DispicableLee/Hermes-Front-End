import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button"
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";

function EditProfileModal({ user, setUser, handleClose }) {
  const [userData, setUserData] = useState({
    username: user.username,
    password: "",
    passwordConfirm: "",
    email: user.email,
    avatar: user.avatar_url
  });
  const navigate = useNavigate();

  function handleChange(e) {
    setUserData({ ...userData, [e.target.name]: e.target.value })
    // console.log(userData)
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/me", {
      method: "PATCH",
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
          handleClose();
        });
      }
    });
  }

  return (
    <div>
      <Card>
        <CardHeader title="Edit Profile" />
        <CardContent>
          <form onSubmit={handleSubmit}
            style={{
              margin: "0 20% 0 20%",
              maxWidth: "60%",
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
            <TextField
              variant="outlined"
              type="text"
              name="avatar_url"
              label="Profile Image"
              value={userData.avatar}
              onChange={(e) => handleChange(e)}
            />
            <br />
            <Button variant="contained" type="submit">Save Changes</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default EditProfileModal;