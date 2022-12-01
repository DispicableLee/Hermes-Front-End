import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { TextField } from "@mui/material";
import MsgSent from "./MsgSent";
import MsgReceived from "./MsgReceived";

export default function ConvoFrame({ convoData }) {
  // debugger
  console.log(convoData.messages)

  convoData.messages.map( msg => {
    return(console.log(msg.content))
  })

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
          title={convoData.title}
          subheader="Participants?"
        />
        <CardMedia
          component="img"
          height="194"
          image="/static/images/cards/paella.jpg"
          alt="Paella dish"
        />
        {/* <CardContent> */}
          
          {/* {convoData.messages.map(msg => {
            return (
              <li>{msg.content}</li>
            )
          })} */}
          
          {/* {convoData.messages.map((msg, i) => {
            let renderMessage; 
            if (msg.sender == "Rohan") {
              renderMessage = <MsgSent key={i} msg={msg} />;
            } else {
              renderMessage = <MsgReceived key={i} msg={msg} />;
            }
            return (
              <div>
                {renderMessage}
              </div>
            )
          })} */}
          {/* ======================= chat session content goes here =========================
          <aside
            style={{
              marginLeft: "20px",
              maxWidth: "50%",
              float: "right",
            }}
          >
            <MsgSent />
          </aside>
          <aside
            style={{
              margin: "20px",
              maxWidth: "50%",
            }}
          >
            <MsgReceived />
          </aside>
          <aside
            style={{
              marginLeft: "20px",
              maxWidth: "50%",
              float: "right",
            }}
          >
          </aside> */}
        {/* </CardContent> */}
      </Card>
      <TextField
        style={{
          width: "50%",
        }}
      />
    </div>
  );
}
