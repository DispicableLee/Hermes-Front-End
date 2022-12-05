import * as React from 'react';
import Box from '@mui/material/Box';
import ChatTile from './ChatTile'
// import Card from '@mui/material/Card';
import { List, ListItem } from '@mui/material';

function ChatSideBar({ convoData }) {

  if (convoData.length > 0) {
    return (
      <Box sx={{ width: '100%' }}>
          <List>
            {convoData.map((convo) => (
              <ChatTile key={convo.id} convo={convo}>
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