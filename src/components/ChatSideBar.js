import * as React from 'react';
import ChatTile from './ChatTile'
import { Box, List } from '@mui/material';

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