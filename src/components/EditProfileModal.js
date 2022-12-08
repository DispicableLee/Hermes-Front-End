import React, { useState } from "react";
import { Stack, TextField } from "@mui/material";
import Button from "@mui/material/Button"
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";

function EditProfileModal({ user, setUser, handleClose }) {
  const [userData, setUserData] = useState({
    username: user.username,
    password: "",
    password_confirmation: "",
    email: user.email,
    avatar_url: ""
  });


  function handleChange(e) {
    setUserData({ ...userData, [e.target.name]: e.target.value })
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
            password_confirmation: "",
            email: "",
            avatar_url: ""
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
            <Stack spacing={1}>
              <TextField
                variant="outlined"
                type="text"
                label="Username"
                autoComplete="off"
                name="username"
                value={userData.username}
                onChange={(e) => handleChange(e)}
              />
              <TextField
                variant="outlined"
                type="text"
                label="Email"
                name="email"
                autoComplete="off"
                value={userData.email}
                onChange={(e) => handleChange(e)}
              />
              <TextField
                variant="outlined"
                type="password"
                name="password"
                label="Password"
                value={userData.password}
                onChange={(e) => handleChange(e)}
                autoComplete="current-password"
              />
              <TextField
                variant="outlined"
                type="password"
                name="password_confirmation"
                label="Confirm Password"
                value={userData.passwordConfirm}
                onChange={(e) => handleChange(e)}
                autoComplete="current-password"
              />
              <TextField
                variant="outlined"
                type="text"
                name="avatar_url"
                label="Profile Image"
                value={userData.avatar_url}
                onChange={(e) => handleChange(e)}
              />
              <Button variant="contained" type="submit">Save Changes</Button>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default EditProfileModal;
