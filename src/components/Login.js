import { useState } from "react";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button"
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";

function Login({ setIsLoggedIn }) {
    // const [userLoginData, setUserLoginData] = useState({
    //     username: "",
    //     password: ""
    // });
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // function handleChange(e) {
    //     setUserLoginData({
    //         ...userLoginData,
    //         [e.target.name]: e.target.value
    //     });
    // }

    // function handleSubmit(e) {
    //     e.preventDefault();
    //     logUserIn(userLoginData);
    // }
    function handleSubmit(e) {
        e.preventDefault();
        fetch("http://localhost:3000/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }).then((r) => {
          if (r.ok) {
            r.json().then((user) => setIsLoggedIn(user));
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