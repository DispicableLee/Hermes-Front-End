import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Sent from './Sent'
import Recieved from './Recieved'


export default function ChatSesh() {

  return (
    <Card sx={{ maxWidth: "75%" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Group Chat Name"
        subheader="Participants?"
      />
      <CardMedia
        component="img"
        height="194"
        image="/static/images/cards/paella.jpg"
        alt="Paella dish"
      />
      <CardContent>
{/* ======================= chat session content goes here ========================= */}
        <aside style={{
            float: 'right',
            margin: '20px'
        }}>
            <Sent/>
        </aside>
        <aside style={{
            float: 'left',
            margin: '20px'
        }}>
            <Recieved/>
        </aside>
      </CardContent>

    </Card>
  );
}