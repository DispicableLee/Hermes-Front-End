import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardMedia } from "@mui/material";
import AddContacts from "./AddContacts";
import { useState, useEffect } from "react";

function Contacts() {
  const [contactsList, setContactsList] = useState([]);
  useEffect(() => {
    fetch("/mycontacts")
      .then((r) => r.json())
      .then(setContactsList);
    console.log(contactsList);
  }, []);

  const renderedContactsList = contactsList.map((friend) => {
    return (
      <Card sx={{maxWidth: 200}}>
        <CardMedia
        component="img"
        height="200"
        image={friend.friend.avatar_url}
        alt="Paella dish"
      />
        <CardContent>
            <Typography variant="body2" color="text.secondary">
          {friend.friend.username}
            </Typography>
        </CardContent>
      </Card>
    );
  });
  return (
    <div>
      <Card>
        <CardHeader title="My Contacts" />
        <AddContacts />
        {renderedContactsList}
      </Card>
    </div>
  );
}

export default Contacts;
