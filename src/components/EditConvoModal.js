import React, { useState } from "react";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button"
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";

function EditConvoModal({ handleClose, selectedChat, setSelectedChat }) {
    const [chatData, setChatData] = useState({
        title: selectedChat.title,
        convo_url: ""
    })

    function handleChange(e) {
        setChatData({ ...chatData, [e.target.name]: e.target.value })
    }

    function handleSubmit(e) {
        e.preventDefault();
        fetch(`/conversations/${selectedChat.id}}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(chatData),
        }).then((r) => {
            if (r.ok) {
                r.json().then(chat => {
                    console.log(chat)
                    setSelectedChat({ ...selectedChat, title: chatData.title, convo_url: chatData.convo_url })
                    setChatData({
                        title: "",
                        convo_url: ""
                    })
                    handleClose();
                });
            }
        });
    }

    return (
        <div>
            <Card>
                <CardHeader title="Edit Chat" />
                <CardContent>
                    <form onSubmit={handleSubmit}
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
                            value={chatData.title}
                            onChange={(e) => handleChange(e)}
                        />
                        <br />
                        <TextField
                            variant="outlined"
                            type="text"
                            name="convo_url"
                            label="Add a chat image url..."
                            value={chatData.convo_url}
                            onChange={(e) => handleChange(e)}
                        />
                        <br />
                        <Button variant="contained" type="submit">Save Changes</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

export default EditConvoModal;
