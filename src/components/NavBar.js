import "../App.css";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
// import { Navigate } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";

function NavBar({ user, setUser }) {
    const navigate = useNavigate()

    function handleEditProfileClick() {
        navigate("/profile")
    }

    function handleLogoutClick() {
        fetch("/logout", { method: "DELETE" })
            .then((r) => {
                if (r.ok) {
                    setUser(null);
                    navigate("/login")
                }
            });
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color="error">
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
                    <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                        hermes
                    </Typography>
                    <div>
                        {user ? (
                            <>
                                <Button color="inherit" onClick={handleEditProfileClick}>Hi, {user.username}! Profile</Button>
                                <Button color="inherit" onClick={() => navigate("/chats")}>Chats</Button>
                                <Button color="inherit" onClick={() => navigate("/contacts")}>Contacts</Button>
                                <Button color="inherit" onClick={handleLogoutClick}>Logout</Button>
                            </>
                        ) : (
                            <>
                                <Link to="/signup">Signup</Link>
                                <Link to="/login">Login</Link>
                            </>
                        )}
                    </div>
                </Toolbar>
            </AppBar>
        </Box >
    )
}

export default NavBar
