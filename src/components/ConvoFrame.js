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

export default function ConvoFrame({ convoData, sendNewMessage }) {
  const [newMessage, setNewMessage] = useState("");

  let messageList;
  if (!!convoData.messages) {
    messageList = convoData.messages;
  } else {
    return null;
  }

  function handleSubmit(e) {
    e.preventDefault();
    sendNewMessage(newMessage);
  }

  function handleChange(e) {
    setNewMessage(e.target.value);
  }

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
          title={"ConvoTitle: " + convoData.title}
          subheader={
            "Participants: " + convoData.users.map((u) => u.username).join(", ")
          }
        />
        <CardMedia
          component="img"
          height="194"
          image="/static/images/cards/paella.jpg"
          alt="Paella dish"
        />
        <CardContent>
          {messageList.map((msg, i) => {
            let renderMessage;
            if (msg.sender === "David") {
              renderMessage = (
                <aside
                  key={i + 10}
                  style={{
                    // marginLeft: "20px",
                    margin: "0 0 10px 10px",
                    maxWidth: "50%",
                    float: "right",
                    position: 'static'
                  }}
                >
                  <MsgSent key={`Convo_id: ${i + 1}`} msg={msg} />
                </aside>
              );
            } else {
              renderMessage = (
                <aside
                  key={i + 10}
                  style={{
                    marginLeft: "20px",
                    maxWidth: "50%",
                    float: "left",
                    position: "static",
                  }}
                >
                  <MsgReceived key={`Convo_id: ${i + 1}`} msg={msg} />
                </aside>
              );
            }
            return <div>{renderMessage}</div>;
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
    </div>
  );
}
