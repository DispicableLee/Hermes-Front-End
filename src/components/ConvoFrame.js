import React, { useState, useEffect, useRef } from "react";
// import { useLocation } from 'react-router-dom';
// MUI styling --------------------------------------------------------------
import { Avatar, Box, Button, Card, CardContent, CardHeader, Grid, IconButton, Modal, TextField } from "@mui/material";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EmojiPicker from 'emoji-picker-react';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import palette from '../theme/palette';
import { alpha } from '@mui/material/styles';
// child components ---------------------------------------------------------
import MsgSent from "./MsgSent";
import MsgReceived from "./MsgReceived";
import EditConvoModal from "./EditConvoModal";
// import useResponsive from './useResponsive';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const color = palette.grey[500];

function ConvoFrame({ user, selectedChat, setSelectedChat, sendNewMessage, deleteMessage, postUpdatedMessage }) {
  const [newMessage, setNewMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const ref = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    sendNewMessage(newMessage);
    setNewMessage("")
    setShowEmojiPicker(false);
  }

  function handleChange(e) {
    setNewMessage(e.target.value);
  }

  const handleClickOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setShowEmojiPicker(false);
    }
  };

  useEffect(() => {
    // autoLogin()
    const lastMsg = document.querySelector("#ChatContainer > div:last-child aside")
    if (!lastMsg) {
      return
    } else {
      // console.log(lastMsg) 
      lastMsg.scrollIntoView(false)
    }

    document.addEventListener('click', handleClickOutside, true);
    return () => document.removeEventListener('click', handleClickOutside, true)
  }, [selectedChat, user])

  const emojiPicker = showEmojiPicker ? <div ref={ref}><EmojiPicker onEmojiClick={e => addEmoji(e)} /></div> : null;
  const chatHeight = showEmojiPicker ? "250px" : "600px";

  function addEmoji(e) {
    setNewMessage(newMessage => newMessage + e.emoji)
  }

  if (!!selectedChat) {
    return (
      <div>
        <Card
          sx={{ maxWidth: "50%" }}
          style={{
            margin: "auto",
            transform: "translate(0%, 4%)",
            backgroundColor: "white",
            boxShadow: `0 0 2px 0 ${alpha(color, 0.2)}, 0 12px 24px -4px ${alpha(color, 0.12)}`
          }}
        >
          <CardHeader
            avatar={
              <Avatar 
                sx={{ bgcolor: red[500] }} 
                aria-label="recipe" 
                src={selectedChat.convo_url}
              />
            }
            action={
              <IconButton aria-label="settings" onClick={handleOpen}>
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
          <CardContent style={{
            height: chatHeight, overflowY: "scroll", overflowX: "hidden",
            backgroundColor: "#F9FAFB"
          }} id="ChatContainer">
            {selectedChat.messages.map((msg, i) => {
              let renderMessage;
              if (msg.sender === user.username) {
                renderMessage = (

                  <aside
                    style={{
                      margin: "0 0 10px 10px",
                      minWidth: "51%",
                      float: "right",
                      position: 'static',
                      display: "block",
                    }}
                  >
                    <MsgSent 
                      key={`sent: ${msg.id}`} 
                      msg={msg} 
                      deleteMessage={deleteMessage}
                      postUpdatedMessage={postUpdatedMessage}
                    />
                  </aside>

                );
              } else {
                renderMessage = (
                  <aside
                    style={{
                      margin: "0 0 10px 10px",
                      minWidth: "51%",
                      float: "left",
                      position: "static",
                      display: "block"
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
            {emojiPicker}
            <Grid container spacing={0}>
              <Grid item xs={6} md={9}>
                <TextField
                  variant="outlined"
                  label="New Message"
                  style={{
                    width: "95%",
                    margin: "2%",
                    padding: 0
                  }}
                  value={newMessage}
                  onChange={handleChange}
                />
              </Grid>
              <Grid 
                item xs={3} 
                md={0.75}
                style ={{ 
                  margin: 'auto',
                  justifyContent: 'center',
                  display: 'inline-block',
                }}
                >
                
              {/* </Grid>
              <Grid item xs={4}> */}
                <InsertEmoticonIcon 
                  onClick={() => setShowEmojiPicker(true)} 
                  />
              </Grid>
              <Grid 
                item xs={3} 
                md={2.25}
                style ={{ 
                  margin: 'auto',
                  justifyContent: 'center',
                  display: 'inline-block',
                }}
                >
                <Button
                  variant="contained"
                  color="success"
                  type="submit"
                  style={{ 
                    width: "90%"
                  }}
                >
                  Send
                </Button>
              </Grid>
            </Grid>
          </form>
        </Card>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <EditConvoModal
              selectedChat={selectedChat}
              setSelectedChat={setSelectedChat}
              handleClose={handleClose} />

          </Box>
        </Modal>
      </div >
    );
  }
}

export default ConvoFrame;