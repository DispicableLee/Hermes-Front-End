import "../App.css";
import * as React from "react";
import { AppBar, Avatar, Box, Badge, Button, Divider, Drawer, IconButton, List, ListItemButton, Toolbar, Typography } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import NotificationsIcon from '@mui/icons-material/Notifications';
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

function NavBar({ user, setUser, notifications }) {
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
                    style={{ background: '#6967af' }}
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
                                    <Typography color="inherit"
                                        style={{ float: "right" }}
                                        onClick={handleEditProfileClick}>
                                        Hi, {user.username}!
                                    </Typography>
                                    <Badge badgeContent={notifications} color="primary" style={{ float: "right" }}>
                                        <Avatar
                                            style={{
                                                float: "right"
                                            }}
                                            src={user.avatar_url}
                                            onClick={() => navigate("/profile")}

                                        ></Avatar>
                                    </Badge>
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
