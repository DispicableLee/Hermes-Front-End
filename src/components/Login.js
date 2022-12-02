import { useState } from "react";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button"
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";

function Login({ logUserIn }) {
    const [userLoginData, setUserLoginData] = useState({
        username: "",
        password: ""
    });

    function handleChange(e) {
        setUserLoginData({
            ...userLoginData,
            [e.target.name]: e.target.value
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        logUserIn(userLoginData);
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
                    <TextField variant="outlined" label="Username" name="username" value={userLoginData.username} onChange={handleChange} />
                    <br />
                    <TextField variant="outlined" label="Password" type="password" name="password" value={userLoginData.password} onChange={handleChange} />
                    <br />
                    <Button variant="contained" type="submit">Sign In</Button>
                </form>
            </CardContent>
        </Card>
    </div>
}

export default Login;