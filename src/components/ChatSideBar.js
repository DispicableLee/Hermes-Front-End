import * as React from 'react';
import Box from '@mui/material/Box';
import ChatTile from './ChatTile'
// import Card from '@mui/material/Card';
import { List, ListItem } from '@mui/material';

export default function SideBar() {
  return (
    <Box sx={{ width: '100%' }}>
      <List>
        <ChatTile/>
      </List>
    </Box>
  );
}