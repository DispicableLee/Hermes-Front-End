import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, CardHeader, CardMedia, Modal, Stack, TextField } from '@mui/material';
import EditProfileModal from './EditProfileModal';
import useResponsive from './useResponsive';
import palette from '../theme/palette';
import { styled, alpha } from '@mui/material/styles';

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

const color = palette.grey[500];

function Profile({ user, setUser, autoLogin }) {
    // const mdUp = useResponsive('up', 'md');
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const mdUp = useResponsive('up', 'md');

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
        <div style={{margin: '0 35%'}}>
            {mdUp && 
            <Card
                style={{
                    boxShadow: `0 0 2px 0 ${alpha(color, 0.2)}, 0 12px 24px -4px ${alpha(color, 0.12)}`,
                    // width: '50%',
                    margin: 'auto',
                    marginTop: '5%',
                    padding: '5%',
                    justifyContent: 'center',
                    display: 'inline-block',
                    // flexDirection: 'column'
                }}
            
            >
                <CardHeader title="My Profile" style={{ textAlign: 'center' }}/>
                <CardContent>
                    <CardMedia
                        component="img"
                        sx={{
                            width: '1500px',
                            height: '1500px',
                            borderRadius: '75%',
                            maxHeight: { xs: 350, md: 350 },
                            maxWidth: { xs: 350, md: 350 },
                        }}
                        alt={"User Avatar"}
                        src={user.avatar_url}
                        onClick={handleOpen}
                    />
                </CardContent>
                <Stack spacing={3}>
                    <TextField
                        variant="outlined"
                        label="Username"
                        style={{
                            width: "100%",
                        }}
                        disabled={true}
                        value={user.username}
                        onClick={handleOpen}
                    />
                    <TextField
                        variant="outlined"
                        label="Email"
                        style={{
                            width: "100%",
                        }}
                        disabled={true}
                        value={user.email}
                        onClick={handleOpen}
                    />
                </Stack>
            </Card>
            }
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