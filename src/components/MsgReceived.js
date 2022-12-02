import * as React from 'react';
// import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


export default function MsgReceived({ msg }) {
    const timeObj = {
        date: msg.created_at.substring(0, 10),
        time: msg.created_at.substring(11, 16)
    }

    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography variant="body2">
                    {msg.sender}
                    <br />
                    {msg.content}
                    <br />
                    <small>Time: {timeObj.time}</small>
                </Typography>
            </CardContent>
        </Card>
    );
}