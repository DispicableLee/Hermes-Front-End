import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button"
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";

function Login({ user, setUser, getConversations }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

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
                    setUser(true);
                    setPassword("");
                    navigate("/chats");

                });
            } else {
                res.json().then(e => console.log(e))
            }
        });
    }

    return <div>
        <Card>
            <CardHeader title="Login" />
            <CardContent>
                <form onSubmit={handleSubmit}
                    style={{
                        margin: "0 20% 0 20%",
                        maxWidth: "50%",
                    }}
                >
                    <TextField variant="outlined" label="Username" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <br />
                    <TextField variant="outlined" label="Password" id="password" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <br />
                    <Button variant="contained" type="submit">Sign In</Button>
                </form>
            </CardContent>
        </Card>
    </div>
}

export default Login;