import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


export default function MsgSent({ msg }) {
    const timeObj = {
        date: msg.created_at.substring(0, 10),
        time: msg.created_at.substring(11, 16)
    }

    return (

        <Card sx={{ 
            minWidth: 275, 
            marginRight: '10px'
            }}>
            <CardContent>
                <Typography variant="body2">
                    {msg.content}
                    <br />
                    <small>Time: {timeObj.time}</small>
                </Typography>
            </CardContent>
        </Card>
    );
}