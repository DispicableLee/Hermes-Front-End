import * as React from 'react';
import { useState } from 'react';
import { TextField } from "@mui/material";
import Button from "@mui/material/Button"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function MsgSent({ msg, deleteMessage, postUpdatedMessage }) {
    const [showEditIcon, setShowEditIcon] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [updatedMessage, setUpdatedMessage] = useState(msg.content);

    const timeObj = {
        date: msg.created_at.substring(0, 10),
        time: msg.created_at.substring(11, 16)
    }

    const editMessage = () => setIsEditMode(true);
    const cancelEdit = () => setIsEditMode(false);

    const handleEditChange = (e) => setUpdatedMessage(e.target.value);

    function handleUpdateMessage(e) {
        e.preventDefault()
        // console.log(msg)
        postUpdatedMessage({ ...msg, content: updatedMessage })
        setIsEditMode(false)
        setShowEditIcon(false)
    }

    return (

        <Card sx={{ minWidth: 275, marginRight: '10px' }}>
            <CardContent
                onMouseEnter={() => setShowEditIcon(true)}
                onMouseLeave={() => setShowEditIcon(false)}
            >
                {/* <Typography /> */}
                {isEditMode ?
                    <TextField
                        variant="outlined"
                        value={updatedMessage}
                        onChange={handleEditChange}
                    />
                    : msg.content}
                <br />
                <small>Time: {timeObj.time}</small>
                {isEditMode ?
                    <form onSubmit={handleUpdateMessage}>
                        <Button variant="contained" type="submit">
                            Save
                        </Button>
                        <Button variant="contained" onClick={cancelEdit}>
                            Cancel
                        </Button>
                    </form>
                    : null}
                {showEditIcon ?
                    <>
                        <EditIcon onClick={editMessage} />
                        <DeleteIcon onClick={() => deleteMessage(msg.id)} />
                    </>
                    : null}
            </CardContent>
        </Card>
    );
}