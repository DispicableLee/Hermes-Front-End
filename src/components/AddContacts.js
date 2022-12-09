import * as React from 'react';

import { Box, Button, Card, CardMedia, CardHeader, CardContent, Grid, Modal, Table, TableBody, TableContainer } from '@mui/material';
// import CardContent from "@mui/material/CardContent";
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import NewContactForm from './NewContactForm';
// import { CardMedia } from '@mui/material';

export default function AddContacts({ contactsList, setContactsList, requestSent, setRequestSent }) {
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
      <Grid xs={2} style={{ margin: "10px" }}>

        <Card
          style={{
            // boxShadow: `0 0 2px 0 ${alpha(color, 0.2)}, 0 12px 24px -4px ${alpha(color, 0.12)}`,
            // width: '50%',
            margin: 'auto',
            marginTop: '2%',
            padding: '2%',
            justifyContent: 'center',
            display: 'inline-block',
            // flexDirection: 'column'
          }}

        >
          <Button variant="outlined" onClick={handleClickOpen}>
            Add New Contact
          </Button>
          <CardMedia
            component="img"
            height="200px"
            sx={{
              height: '200px',
              width: '200px',
              borderRadius: '50%',
            }}
            image="https://cdn-icons-png.flaticon.com/512/6570/6570292.png"
            alt="add new contact" />
        </Card>
      </Grid>

      <NewContactForm
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        contactsList={contactsList}
        setContactsList={setContactsList}
        requestSent={requestSent}
        setRequestSent={setRequestSent}
      />
    </div>
  );
}