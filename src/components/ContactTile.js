import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { CardMedia } from "@mui/material";
import { useNavigate } from "react-router-dom";

function ContactTile({ user, friend, acceptFriendRequest }) {
    const navigate = useNavigate();

    function startChat() {
        fetch('/conversations', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title: "New Chat",
                participants: [friend.id, user.id]
            })
        })
        navigate("/chats")
    }

    let acceptedFriendBtn = friend.contact_status ?
        <Button
            variant="contained"
            onClick={startChat}
        >Start Chat
        </Button> :
        <Button
            variant="contained"
            onClick={() => acceptFriendRequest(friend.id)}
        >
            Accept Friend Request
        </Button>;

    return (
        <Card sx={{ maxWidth: 300 }} key={friend.username}>
            <CardMedia
                component="img"
                height="200"
                image={friend.avatar_url}
                alt={friend.username}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {friend.username}
                </Typography>
            </CardContent>
            {acceptedFriendBtn}
            <br />
        </Card>
    )

}

export default ContactTile;