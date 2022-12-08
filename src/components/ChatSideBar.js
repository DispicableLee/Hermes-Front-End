import * as React from 'react';
import Box from '@mui/material/Box';
import ChatTile from './ChatTile'
// import Card from '@mui/material/Card';
import { List } from '@mui/material';

function ChatSideBar({ user, convoData, renderConversation }) {

  if (convoData.length > 0) {
    return (
      <Box
        sx={{ maxWidth: '50%' }}
        style={{ margin: "auto" }}
      >
        <List>
          {convoData.map((convo) => (
            <ChatTile
              key={convo.id}
              user={user}
              convo={convo}
              renderConversation={renderConversation}>
              {convo.title}
            </ChatTile>
          ))}
        </List>
      </Box>
    );
  } else {
    return null;
  }


}

export default ChatSideBar;