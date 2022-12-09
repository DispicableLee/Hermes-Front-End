import * as React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import palette from '../theme/palette';
import { alpha } from '@mui/material/styles';

const color = palette.grey[500];


export default function MsgReceived({ msg }) {
    const timeObj = {
        date: msg.created_at.substring(0, 10),
        time: msg.created_at.substring(11, 16)
    }

    return (
        <Card 
            sx={{ 
                minWidth: 275,
                boxShadow: `0 0 2px 0 ${alpha(color, 0.2)}, 0 12px 24px -4px ${alpha(color, 0.12)}` 
                }}
        >
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