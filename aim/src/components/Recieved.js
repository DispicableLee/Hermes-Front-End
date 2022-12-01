import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


export default function Recieved() {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="body2">
          Haha i'll lyk
          <br/>
          <small>sent 2 weeks ago</small>
        </Typography>
      </CardContent>
    </Card>
  );
}