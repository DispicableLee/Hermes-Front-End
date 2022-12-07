import "../App.css";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import * as React from "react";
import { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Avatar } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Link, useNavigate } from "react-router-dom";
//============== main styling ===========================================
const drawerWidth = 240;

//============================ drawer header styling =======================================
const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
}));

function NavBar({ user, setUser }) {
    const navigate = useNavigate();
    //=========================== handle open/close====================================
    const theme = useTheme();
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        // console.log(!!user)
        if (!!user) {
            setOpen(true);
        } else {
            navigate('/login');
        }
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };


    function handleEditProfileClick() {
        navigate("/profile");
    }

    function handleLogoutClick() {
        fetch("/logout", { method: "DELETE" }).then((r) => {
            if (r.ok) {
                setUser(null);
                navigate("/login");
            }
        });
    }

    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar
                    position="static"
                    color="error"
                >
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            onClick={handleDrawerOpen}
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                            hermes
                        </Typography>
                        <div>
                            {user ? (
                                <>
                                    <Avatar
                                        style={{
                                            float: "right"
                                        }}
                                        src={user.avatar_url}
                                        onClick={() => navigate("/profile")}

                                    ></Avatar>
                                    <Typography color="inherit"
                                        style={{ float: "right" }}
                                        onClick={handleEditProfileClick}>
                                        Hi, {user.username}!
                                    </Typography>
                                </>
                            ) : (
                                <>
                                    <Button color="inherit" onClick={() => navigate("/signup")}>Sign Up</Button>
                                    <Button color="inherit" onClick={() => navigate("/login")}>Login</Button>
                                    {/* <Link to="/signup">Signup</Link>
                                    <Link to="/login">Login</Link> */}
                                </>
                            )}
                        </div>
                    </Toolbar>
                </AppBar>
                {/* =============================== drawer ========================================== */}
                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        "& .MuiDrawer-paper": {
                            width: drawerWidth,
                            boxSizing: "border-box",
                        },
                    }}
                    variant="persistent"
                    anchor="left"
                    open={open}
                    onMouseLeave={() => handleDrawerClose()}
                >
                    <DrawerHeader>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === "ltr" ? (
                                <ChevronLeftIcon />
                            ) : (
                                <ChevronRightIcon />
                            )}
                        </IconButton>
                    </DrawerHeader>
                    <Divider />
                    <List>
                        {/* ====================================== instantiating all the links ========================================= */}
                        <ListItemButton onClick={() => {
                            user ? navigate("/profile") : navigate("login")
                            handleDrawerClose()
                        }}>
                            Profile
                        </ListItemButton>
                        <ListItemButton onClick={() => {
                            navigate("/contacts")
                            handleDrawerClose()
                        }}>
                            Contacts
                        </ListItemButton>
                        <ListItemButton onClick={() => {
                            navigate("/chats")
                            handleDrawerClose()
                        }}>
                            Chats
                        </ListItemButton>
                        <ListItemButton onClick={() => {
                            handleLogoutClick()
                            handleDrawerClose()
                        }}>
                            Logout
                        </ListItemButton>
                    </List>
                </Drawer>
            </Box>
        </div>
    );
}

export default NavBar;
