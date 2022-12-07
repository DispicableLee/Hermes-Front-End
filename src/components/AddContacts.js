import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import { blue } from '@mui/material/colors';
import { useState } from 'react';

// const emails = ['username@gmail.com', 'user02@gmail.com'];

function NewContactForm(props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [contacts, setContacts] = useState([])
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  const searchUser = () => {
    fetch(`/users?query=${searchQuery}`)
      .then(r => r.json())
      .then(r => {
        console.log(r)
        setContacts(r)
      })
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <TextField
        placeholder='Search by Username'
        value={searchQuery}
        name="search"
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Button variant='contained' onClick={searchUser}>Search</Button>
      {/* ============================= mapping our users from get request ================================= */}
      <List sx={{ pt: 0 }}>
        {contacts.map(c => (
          <ListItem button onClick={() => handleListItemClick(c)} key={c.username}>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={c.username} />
            <Button
              variant='contained'
            >Add Friend</Button>
          </ListItem>
        ))}

        {/* <ListItem autoFocus button onClick={() => handleListItemClick('addAccount')}>
          <ListItemAvatar>
            <Avatar>
              <AddIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Add account" />
        </ListItem> */}
      </List>
    </Dialog>
  );
}

NewContactForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function AddContacts() {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <Typography variant="subtitle1" component="div">
        Selected: {selectedValue}
      </Typography>
      <br />
      <Button variant="outlined" onClick={handleClickOpen}>
        Add New Contact
      </Button>
      <NewContactForm
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}