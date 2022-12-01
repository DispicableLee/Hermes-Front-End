import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { TextField } from "@mui/material";
import Sent from "./Sent";
import Recieved from "./Recieved";

export default function ChatSesh() {
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
          title="Group Chat Name"
          subheader="Participants?"
        />
        <CardMedia
          component="img"
          height="194"
          image="/static/images/cards/paella.jpg"
          alt="Paella dish"
        />
        <CardContent>
          {/* ======================= chat session content goes here ========================= */}
          <aside
            style={{
              marginLeft: "20px",
              maxWidth: "50%",
              float: "right",
            }}
          >
            <Sent />
          </aside>
          <aside
            style={{
              margin: "20px",
              maxWidth: "50%",
            }}
          >
            <Recieved />
          </aside>
          <aside
            style={{
              marginLeft: "20px",
              maxWidth: "50%",
              float: "right",
            }}
          >
            <Sent />
          </aside>
        </CardContent>
      </Card>
      <TextField
        style={{
          width: "50%",
        }}
      />
    </div>
  );
}
