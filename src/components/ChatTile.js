import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';


function ChatTile({ user, convo, renderConversation }) {

  function handleClick() {
    renderConversation(convo.id)
  }

  const avatars = convo.users.filter(u => {
    return u.username !== user.username
  }).map(user => {
    return (<Avatar key={user.id} src={user.avatar_url} />)
  })

  return (
    <Card sx={{ width: 350, maxHeight: 350, margin: "20px" }} onClick={handleClick}>
      <CardHeader
        title={convo.title}
        subheader={convo.most_recent_message_timestamp}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {convo.most_recent_message.content}
        </Typography>
      </CardContent>
      <AvatarGroup max={3} style={{ float: "left" }}>
        {avatars}
      </AvatarGroup>
      {/* <CardActions disableSpacing> */}
      {/* </CardActions> */}
    </Card >
  );
}

export default ChatTile;