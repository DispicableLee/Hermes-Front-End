import * as React from 'react';
import { Card, CardHeader, CardContent, Avatar, AvatarGroup, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import palette from '../theme/palette';

const color = palette.grey[500];

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
      style={{boxShadow: `0 0 2px 0 ${alpha(color, 0.2)}, 0 12px 24px -4px ${alpha(color, 0.12)}`}}
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
    </Card >
  );
}

export default ChatTile;