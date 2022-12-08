import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import NewContactForm from './NewContactForm';

export default function AddContacts({ contactsList, setContactsList }) {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState("");

  const handleClickOpen = () => setOpen(true);

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <Typography variant="subtitle1" component="div">
        {selectedValue}
      </Typography>
      <br />
      <Button variant="outlined" onClick={handleClickOpen}>
        Add New Contact
      </Button>
      <NewContactForm
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        contactsList={contactsList}
        setContactsList={setContactsList}
      />
    </div>
  );
}