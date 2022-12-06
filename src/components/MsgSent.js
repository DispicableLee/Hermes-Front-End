import * as React from 'react';
import { useState } from 'react';
import { TextField } from "@mui/material";
import Button from "@mui/material/Button"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';


export default function MsgSent({ msg }) {
    const [showEditIcon, setShowEditIcon] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [updatedMessage, setUpdatedMessage] = useState(msg.content);
    const timeObj = {
        date: msg.created_at.substring(0, 10),
        time: msg.created_at.substring(11, 16)
    }

    function editMessage() {
        setIsEditMode(true)
    }

    function handleUpdateMessage(e) {
        e.preventDefault()
        console.log("hi, need to add logic for patch request to update message")
        setIsEditMode(false)
        setShowEditIcon(false)
    }

    return (

        <Card sx={{
            minWidth: 275,
            marginRight: '10px'
        }}>
            <CardContent
                onMouseEnter={() => setShowEditIcon(true)}
                onMouseLeave={() => setShowEditIcon(false)}>
                <Typography variant="body2">
                    {isEditMode ? <TextField variant="outlined" label="Edit" value={updatedMessage} /> : msg.content}
                    <br />
                    <small>Time: {timeObj.time}</small>
                    {isEditMode ? <form><Button onSubmit={handleUpdateMessage}>Save</Button></form> : null}
                    {showEditIcon ? <EditIcon onClick={editMessage} /> : null}

                </Typography>

            </CardContent>
        </Card>
    );
}