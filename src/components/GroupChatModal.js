import React, { useState } from "react";
import { TextField } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import Button from "@mui/material/Button"
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import List from "@mui/material/List";
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import { blue } from '@mui/material/colors';
import PersonIcon from '@mui/icons-material/Person';

function GroupChatModal({ user, handleClose, contactsList }) {
    const [newGroupChat, setNewGroupChat] = useState({
        title: "",
        convo_url: "",
        participants: [user.id]
    })

    function handleChange(e) {
        setNewGroupChat({ ...newGroupChat, [e.target.name]: e.target.value })
    }

    function startGroupChat(e) {
        e.preventDefault();
        fetch('/conversations', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newGroupChat)
        })
            .then(r => r.json())
            .then(console.log)
        handleClose()
    }

    function addContactToGroupChat(contactID) {
        if (newGroupChat.participants.includes(contactID)) {
            return
        } else {
            setNewGroupChat({ ...newGroupChat, participants: [...newGroupChat.participants, contactID] })
        }
    }
    console.log(newGroupChat)

    return (
        <div>
            <Card>
                <CardHeader title="Start a new Group Chat" />
                <CardContent>
                    <List sx={{ pt: 0 }}>
                        {contactsList.map(c => {
                            return (
                                <ListItem key={c.username}>
                                    <ListItemAvatar>
                                        <Avatar sx={{ bgcolor: blue[100], color: blue[600] }} src={c.avatar_url}>
                                            <PersonIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={c.username} />
                                    <Button onClick={() => addContactToGroupChat(c.id)}>Add to Chat</Button>
                                </ListItem>
                            )
                        })}
                    </List>
                    <form onSubmit={startGroupChat}
                        style={{
                            margin: "0 20% 0 20%",
                            maxWidth: "60%",
                        }}
                    >
                        <TextField
                            variant="outlined"
                            type="text"
                            label="Chat Title"
                            autoComplete="off"
                            name="title"
                            value={newGroupChat.title}
                            onChange={(e) => handleChange(e)}
                        />
                        <br />
                        <TextField
                            variant="outlined"
                            type="text"
                            name="convo_url"
                            label="Add a chat image url..."
                            value={newGroupChat.convo_url}
                            onChange={(e) => handleChange(e)}
                        />
                        <br />
                        <Button variant="contained" type="submit">Start Chat!</Button>
                    </form>

                </CardContent>
            </Card>
        </div>
    );
}

export default GroupChatModal;
