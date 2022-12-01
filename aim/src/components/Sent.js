import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


export default function Sent() {
  return (
    
    <Card sx={{ minWidth: 275 }}>
      <CardContent>


        <Typography variant="body2">
          Hi, I enjoyed meeting you! when can we meet again?
        </Typography>
      </CardContent>
    </Card>
  );
}