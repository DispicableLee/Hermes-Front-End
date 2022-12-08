import * as React from "react";
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import AddContacts from "./AddContacts";
import ContactTile from "./ContactTile";
import Modal from '@mui/material/Modal';
import GroupChatModal from "./GroupChatModal";
import { useState, useEffect } from "react";

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

function Contacts({ user, autoLogin, getConversations }) {

  const [contactsList, setContactsList] = useState([]);
  const [friendAccepted, setFriendAccepted] = useState(false);

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = (value) => {
    setOpen(false);
    // setParticipantsArray();
  };

  useEffect(() => {
    // autoLogin() ERROR: navigating from another route works. But refresh on /contacts does not work. User appears not to be defined.

    fetch("/mycontacts")
      .then((r) => r.json())
      .then(contacts => {
        // console.log(contacts)
        if (!!contacts && !!user) {
          const mappedContacts = contacts.map(obj => {
            // console.log(user.username, obj.friend)
            if (obj.friend.username === user.username) {
              return { ...obj.user, contact_status: obj.contact_status }
            } else if (obj.user.username === user.username) {
              return { ...obj.friend, contact_status: obj.contact_status }
            } else {
              return null
            }
          })
          // console.log(mappedContacts)
          setContactsList(mappedContacts)
        }
      });
  }, [friendAccepted, user]);

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
      })
      .catch(err => console.error(err))
  }

  const renderedContactsList = contactsList.map((friend) => {
    return (
      <ContactTile key={friend.id} friend={friend}
        acceptFriendRequest={acceptFriendRequest}
        user={user} getConversations={getConversations}
      />
    );

  });

  return (
    <div>
      <Card>
        <CardHeader title="My Contacts" />
        <AddContacts contactsList={contactsList} />
        <Button variant="contained" onClick={handleClickOpen}>New Group Chat</Button>
        {renderedContactsList}
      </Card>
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
