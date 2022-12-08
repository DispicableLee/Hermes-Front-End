import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled, alpha } from '@mui/material/styles';
import { Link, Typography, Container, IconButton, InputAdornment, TextField, Button, CardHeader, Stack } from "@mui/material";
import useResponsive from './useResponsive';
import loginImage from "../assets/mailguy.jpeg"
import customShadows from "../theme/customShadows";
import palette from '../theme/palette';
import Iconify from './iconify';
// import Button from "@mui/material/Button"
// import Card from "@mui/material/Card";
// import CardHeader from "@mui/material/CardHeader";
// import CardContent from "@mui/material/CardContent";

// ----------------------------------------------------------------------
const color = palette.grey[500];

const StyledRoot = styled('div')(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  }));
  
//   const transparent = alpha(color, 0.16);
  const StyledSection = styled('div')(({ theme }) => ({
    width: '100%',
    maxWidth: 480,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    boxShadow: `0 0 2px 0 ${alpha(color, 0.2)}, 0 12px 24px -4px ${alpha(color, 0.12)}`,
    backgroundColor: theme.palette.background.default,
  }));
  
  const StyledContent = styled('div')(({ theme }) => ({
    maxWidth: 480,
    margin: 'auto',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: theme.spacing(12, 0),
  }));
  
  // ----------------------------------------------------------------------
  

function Login({ user, setUser, getConversations }) {
    const mdUp = useResponsive('up', 'md');
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        }).then(res => {
            if (res.ok) {
                console.log(res);
                res.json().then(user => {
                    // console.log(user)
                    setUser(user)
                    getConversations(user);
                    setPassword("");
                    navigate("/chats");

                });
            } else {
                res.json().then(e => console.log(e))
            }
        });
    }

    
    return (
        <>
        {mdUp && (
             <StyledSection>
               <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
                 Hi, Welcome Back
               </Typography>
               <img src={loginImage} alt="login" />
             </StyledSection>
           )}
            <StyledRoot>
                <Container maxWidth="sm">
                <CardHeader />
                    <StyledContent>
                        <Typography variant="h4" gutterBottom>
                            Sign in to hermes
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 5 }}>
                            Don’t have an account? {''}
                            <Link variant="subtitle2">Get started</Link>
                        </Typography>
                        <form onSubmit={handleSubmit}
                            style={{
                                margin: "0 20% 0 20%",
                                maxWidth: "50%",
                            }}
                        >
                            <Stack spacing={3}>
                                <TextField 
                                label="Username" 
                                id="username" 
                                name="username" 
                                value={username} 
                                onChange={(e) => setUsername(e.target.value)} />
                                <TextField 
                                label="Password" 
                                id="password" 
                                type={showPassword ? 'text' : 'password'}
                                name="password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                InputProps={{
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                          <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                                        </IconButton>
                                      </InputAdornment>
                                    ),
                                  }}
                                />
                            </Stack>
                            <Button variant="contained" type="submit">Login</Button>
                        </form>
                    </StyledContent>
                </Container>
            </StyledRoot>
        </>
    )
}

export default Login;