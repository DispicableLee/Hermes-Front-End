import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { CardMedia } from "@mui/material";
import AddContacts from "./AddContacts";
import { useState, useEffect } from "react";

function Contacts({ user }) {
  const [contactsList, setContactsList] = useState([]);
  useEffect(() => {
    fetch("/mycontacts")
      .then((r) => r.json())
      .then(contacts => {
        setContactsList(contacts)
      });
  }, []);


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
      <Card sx={{ maxWidth: 300 }} key={friend.username}>
        <CardMedia
          component="img"
          height="200"
          image={friend.avatar_url}
          alt={friend.username}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {friend.username}
          </Typography>
        </CardContent>
        <Button
          variant="contained"
        // onClick={startConvo(friend.friend.id)}
        >
          Start Chat
        </Button>
        <br />
      </Card>
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
