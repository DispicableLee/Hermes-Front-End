import "../App.css";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
// import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function NavBar({ isLoggedIn, setIsLoggedIn }) {
    const navigate = useNavigate();

    function handleLogin() {
        if (isLoggedIn) {
            fetch("http://localhost:3000/logout", { method: "DELETE" })
            setIsLoggedIn(false)
            navigate('/login')
        } else {
            navigate('/login');
        }
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

                    <Button
                        color="inherit"
                        onClick={handleLogin}
                    >
                        {isLoggedIn ? "Logout" : "Login"}
                    </Button>

                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default NavBar
