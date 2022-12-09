import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { CardMedia } from "@mui/material";
import { useNavigate } from "react-router-dom";

function ContactTile({ user, friend, acceptFriendRequest, getConversations }) {
    const navigate = useNavigate();

    function startChat() {
        console.log(user, friend)
        fetch('/conversations', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title: "New Chat",
                participants: [friend.id, user.id]
            })
        })
            .then(r => {
                navigate("/chats")
                if (r.ok) {
                    r.json().then(r => {
                        console.log(r)
                        // getConversations()
                    })
                } else {

                    console.log(r)
                }
            })
    }

    let friendBtn;

    if (friend.contact_status) {
        friendBtn = (
            <Button
                variant="contained"
                onClick={startChat}
            >Start Chat
            </Button>)
    }
    else {
        // Do not show accept friend button when user === you
        if (friend.direction === "request sent") {
            friendBtn = (
                <Button disabled>
                    Request Sent
                </Button>
            )
        } else if (friend.direction === "request received") {
            friendBtn = (
                <Button
                    variant="contained"
                    onClick={() => acceptFriendRequest(friend.id)}
                >
                    Accept Friend Request
                </Button>
            )
        } else {
            return null
        }
    }

    return (
        <Card
            style={{
                justifyContent: 'center',
                padding: '10%',
                marginLeft: '10%'

            }}

            sx={{ maxWidth: 300 }}
            key={friend.username}
        >
            <CardMedia
                component="img"
                height="200px"
                sx={{
                    height: '200px',
                    width: '200px',
                    borderRadius: '50%',

                }}
                image={friend.avatar_url}
                alt={friend.username}
            />
            <CardContent style={{ textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                    {friend.username}
                </Typography>
            </CardContent>
            {friendBtn}
            <br />
        </Card>
    )

}

export default ContactTile;