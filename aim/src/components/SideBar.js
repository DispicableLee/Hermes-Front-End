import * as React from 'react';
import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
import { List, ListItem } from '@mui/material';

export default function SideBar() {
  return (
    <Box sx={{ width: '100%' }}>
      <List>
        <ListItem>Convo1</ListItem>
        <ListItem>Convo2</ListItem>
      </List>
    </Box>
  );
}