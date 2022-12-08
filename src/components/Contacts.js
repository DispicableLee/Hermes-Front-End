import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { CardMedia } from "@mui/material";
import AddContacts from "./AddContacts";
import ContactTile from "./ContactTile";
import { useState, useEffect } from "react";

function Contacts({ user, autoLogin, getConversations }) {
  const [contactsList, setContactsList] = useState([]);
  const [friendAccepted, setFriendAccepted] = useState(false);
  useEffect(() => {
    // autoLogin() ERROR: navigating from another route works. But refresh on /contacts does not work. User appears not to be defined.

    fetch("/mycontacts")
      .then((r) => r.json())
      .then(contacts => {
        // console.log(contacts)
        if (!!contacts) {
          const mappedContacts = contacts.map(obj => {

            // console.log(user.username, obj.friend)
            if (obj.friend.username === user.username) {
              return { ...obj.user, contact_status: obj.contact_status }
            } else if (obj.user.username === user.username) {
              return { ...obj.friend, contact_status: obj.contact_status }
            }
          })
          // console.log(mappedContacts)
          setContactsList(mappedContacts)
        }
      });
  }, [friendAccepted]);

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
  //   function startConvo(id){
  //     const newObj = {
  //         title: "titleofchat",
  //         participants: [user.id, id]
  //     }
  //     fetch("/conversations", {
  //         method: "POST",
  //         headers: {
  //             "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(newObj)
  //     })
  //     .then((r)=>r.json())
  //     .then(console.log)

  //   }

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
        {renderedContactsList}
      </Card>
    </div>
  );
}

export default Contacts;
