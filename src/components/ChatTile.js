import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Typography from '@mui/material/Typography';

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
    <Card
      sx={{ minWidth: "250px", width: "100%", maxHeight: 350, margin: "20px" }}
      onClick={handleClick}>
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