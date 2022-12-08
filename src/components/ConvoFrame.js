import React, { useState, useEffect, useRef } from "react";
import Box from '@mui/material/Box';
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { TextField } from "@mui/material";
import MsgSent from "./MsgSent";
import MsgReceived from "./MsgReceived";
import EmojiPicker from 'emoji-picker-react';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import EditConvoModal from "./EditConvoModal";
import Modal from '@mui/material/Modal';

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
          }}
        >
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" src={selectedChat.convo_url}>
              </Avatar>
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
          <CardContent style={{ height: chatHeight, overflowY: "scroll", overflowX: "hidden" }} id="ChatContainer">
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
                      postUpdatedMessage={postUpdatedMessage}
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
          <form onSubmit={handleSubmit} >
            {emojiPicker}
            <TextField
              variant="outlined"
              label="New Message"
              style={{
                width: "70%",
              }}
              value={newMessage}
              onChange={handleChange}
            />
            <InsertEmoticonIcon onClick={() => setShowEmojiPicker(true)} />

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