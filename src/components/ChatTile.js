import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';


function ChatTile({ convo }) {
  // debugger;
  return (
    <Card sx={{ width: 350, maxHeight: 350}}>
      <CardHeader
        // avatar={convo.messages.map((message) => (
        //   <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
        //     message.sender
        //   </Avatar>
        // ))}

        // action={
        //   <Typography>
        //     <small>{convo.messages}</small>
        //   </Typography>
        // }
        title={convo.title}
        subheader="September 14, 2016"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Last Chat Message preview
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default ChatTile;