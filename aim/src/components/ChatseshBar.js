import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { List, ListItem } from '@mui/material';
export default function BasicStack() {
  return (
    <Box sx={{ width: '100%' }}>
      <List>
        <ListItem>Hi</ListItem>
        <ListItem>Hi</ListItem>
      </List>
    </Box>
  );
}