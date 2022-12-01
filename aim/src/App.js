import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import "./App.css";

import ConvoFrame from "./components/ConvoFrame";
import SideBar from './components/SideBar';
import { useState, useEffect } from "react";

function App() {
  const [convoData, setConvoData] = useState({})

  useEffect(() => {
    fetch("http://localhost:3000/conversations/3")
    // must change to sessions ID
    .then((res) => res.json())
    .then((data) => setConvoData(data))
  }, [])


  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              News
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <aside
        style={{
          float: 'left'
        }}
      >
      <SideBar />
      </aside>
      <ConvoFrame convoData={convoData}/>
    </div>
  );
}

export default App;
