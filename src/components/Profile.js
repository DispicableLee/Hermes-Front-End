import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import { TextField } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import EditProfileModal from './EditProfileModal';

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

function Profile({ user, setUser, autoLogin }) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        // autoLogin(user)
        fetch("/me")
            .then((r) => r.json())
            .then(r => {
                // console.log(r)
                setUser(r)
            })
    }, [setUser])

    // Error handling if user has not been rendered
    if (user) {
        // Continue
    } else {
        return null; // Exit
    }

    return (
        <div>
            <Card>
                <CardHeader title="My Profile" />
                <CardContent>
                    <CardMedia
                        component="img"
                        sx={{
                            height: 350,
                            width: 350,
                            maxHeight: { xs: 350, md: 350 },
                            maxWidth: { xs: 350, md: 250 },
                        }}
                        alt={"User Avatar"}
                        src={user.avatar_url}
                        onClick={handleOpen}
                    />
                </CardContent>
                <TextField
                    variant="outlined"
                    label="Username"
                    style={{
                        width: "50%",
                    }}
                    disabled={true}
                    value={user.username}
                    onClick={handleOpen}
                />
                <TextField
                    variant="outlined"
                    label="Email"
                    style={{
                        width: "50%",
                    }}
                    disabled={true}
                    value={user.email}
                    onClick={handleOpen}
                />
            </Card>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>

                    <EditProfileModal user={user} setUser={setUser} handleClose={handleClose} />

                </Box>
            </Modal>
        </div>
    )
}

export default Profile;