import * as React from 'react';
import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
import { List, ListItem } from '@mui/material';

export default function SideBar({ convoData }) {
  // console.log("In ChatSideBar", convoData, !!convoData)
  if (convoData.length > 0) {
    return (
      <Box sx={{ width: '100%' }}>
        <List>
          {convoData.map(convo => {
            return (
              <ListItem key={convo.id} >{convo.title}</ListItem>
            )
          })}
        </List>
      </Box>
    );
  } else {
    return null
  }
}