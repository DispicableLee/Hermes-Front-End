import * as React from "react";
import { useState, useEffect } from "react";
import { Box, Button, Card, CardMedia, Grid, Modal } from '@mui/material';
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
          // console.log(mappedContacts);
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
        // navigate("/chats")
      })
      .catch(err => console.error(err))
  }

  const renderedContactsList = contactsList.map((friend) => {
    return (
      <Grid xs={2} style={{ margin: "10px" }} key={friend.id}>

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
      <Grid
        // spacing={0}
        rowSpacing={0}
        columnSpacing={2}

      >
        <Grid xs={3}>
          <Card
            style={{
              padding: '1%',
              margin: "1%",
              justifyContent: 'center',
              display: 'inline-block',
            }}>

            <AddContacts
              contactsList={contactsList} setContactsList={setContactsList} requestSent={requestSent} setRequestSent={setRequestSent} />

          </Card>
          <Card
            style={{
              margin: "1%",
              padding: '1%',
              justifyContent: 'center',
              display: 'inline-block',

            }}
          >
            <Button
              variant="outlined"
              onClick={handleClickOpen}
              style={{ margin: "0 7%" }}
            >
              New Group Chat
            </Button>
            <CardMedia
              component="img"
              height="200px"
              sx={{
                height: '200px',
                width: '200px',
                borderRadius: '50%',
              }}
              image="https://cdn-icons-png.flaticon.com/512/3215/3215206.png"
              alt="new group chat"
            />
          </Card>
        </Grid>
      </Grid >
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
    </div >
  );
}

export default Contacts;
