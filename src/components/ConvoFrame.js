import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { TextField } from "@mui/material";
import MsgSent from "./MsgSent";
import MsgReceived from "./MsgReceived";

function ConvoFrame({ user, selectedChat, sendNewMessage, deleteMessage }) {
  const [newMessage, setNewMessage] = useState("");


  function handleSubmit(e) {
    e.preventDefault();
    sendNewMessage(newMessage);
    setNewMessage("")
  }

  function handleChange(e) {
    setNewMessage(e.target.value);
  }

  if (!!selectedChat) {
    return (
      <div>
        <Card
          sx={{ maxWidth: "50%" }}
          style={{
            margin: "auto",
          }}
        >
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                R
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={selectedChat.title}
            subheader={
              "Participants: " + selectedChat.users.map((u) => u.username).join(", ")
            }
          />
          {/* <CardMedia
            component="img"
            height="194"
            image=""
            alt=""
          /> */}
          <CardContent style={{ maxHeight: "600px", overflowY: "scroll", overflowX: "hidden" }}>
            {selectedChat.messages.map((msg, i) => {
              let renderMessage;
              if (msg.sender === user.username) {
                renderMessage = (
                  <aside
                    style={{
                      margin: "0 0 10px 10px",
                      maxWidth: "50%",
                      float: "right",
                      position: 'static'
                    }}

                  >
                    <MsgSent key={`sent: ${msg.id}`} msg={msg} deleteMessage={deleteMessage}
                    />
                  </aside>
                );
              } else {
                renderMessage = (
                  <aside
                    style={{
                      marginLeft: "20px",
                      maxWidth: "50%",
                      float: "left",
                      position: "static",
                    }}

                  >
                    <MsgReceived key={`rec: ${msg.id}`} msg={msg} />
                  </aside>
                );
              }
              return <div key={`div: ${msg.id}`}>{renderMessage}</div>;
            })}
          </CardContent>
          <form onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              label="New Message"
              style={{
                width: "80%",
              }}
              value={newMessage}
              onChange={handleChange}
            />
            <Button
              variant="contained"
              color="success"
              type="submit"
              style={{ width: "16%", margin: "2%" }}
            >
              Send
            </Button>
          </form>
        </Card>
      </div >
    );
  }
}

export default ConvoFrame;