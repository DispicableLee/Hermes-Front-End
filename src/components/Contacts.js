import * as React from "react";
import { useState, useEffect } from "react";
import { Box, Button, Card, CardHeader, Grid, Modal, Table, TableBody, TableContainer } from '@mui/material';
import AddContacts from "./AddContacts";
import ContactTile from "./ContactTile";
import GroupChatModal from "./GroupChatModal";
import { useNavigate } from "react-router-dom";

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

function Contacts({ user, autoLogin, getConversations, setNotifications }) {

  const [contactsList, setContactsList] = useState([]);
  const [friendAccepted, setFriendAccepted] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = (value) => {
    setOpen(false);
  };
  useEffect(() => autoLogin(), [])
  
  useEffect(() => {
    fetch("/mycontacts")
      .then((r) => r.json())
      .then(contacts => {
        // console.log(contacts, user)
        if (!!contacts && !!user) {
          const mappedContacts = contacts.map(obj => {
            // If friend obj is logged in user, return friend obj. 
            if (obj.friend.username === user.username) {
              return { ...obj.user, contact_status: obj.contact_status, direction: "request received" }
              // If user obj is logged in user, return friend obj.
            } else if (obj.user.username === user.username) {
              return { ...obj.friend, contact_status: obj.contact_status, direction: "request sent" }
            }
            // else {
            //   return null
            // }
          })
          console.log(mappedContacts);
          setContactsList(mappedContacts);
          setNotifications(mappedContacts.reduce((a, c) => a + (!c.contact_status ? 1 : 0), 0));
        }
      });
  }, [friendAccepted, user, requestSent]);
  
  useEffect(() => autoLogin(), [])

  function acceptFriendRequest(friendID) {
    fetch(`/contacts/${friendID}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        accepted: true
      })
    })
      .then(r => r.json())
      .then(friendAccepted => {
        setFriendAccepted(param => !param)
        navigate("/chats")
      })
      .catch(err => console.error(err))
  }

  const renderedContactsList = contactsList.map((friend) => {
    return (
      <Grid xs={2} style={{ margin: "10px" }}>
        <ContactTile
          key={friend.id}
          friend={friend}
          acceptFriendRequest={acceptFriendRequest}
          user={user}
          getConversations={getConversations}
        />
      </Grid>
    );
  });


  return (
    <div>
      <AddContacts 
        contactsList={contactsList} 
        setContactsList={setContactsList} 
        requestSent={requestSent} 
        setRequestSent={setRequestSent}
        />
      <Button
        variant="contained"
        onClick={handleClickOpen}
      >
        New Group Chat
      </Button>
      <Grid container rowSpacing={0} columnSpacing={2}>
        {renderedContactsList}
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <GroupChatModal user={user} contactsList={contactsList} handleClose={handleClose} />
        </Box>
      </Modal>
    </div>
  );
}

export default Contacts;
