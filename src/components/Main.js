import * as React from "react";
import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from './Login';
import Home from './Home';
import Chats from './Chats';
import Contacts from './Contacts';
import Profile from './Profile';
import SignUp from "./SignUp";

function Main({ isLoggedIn, setIsLoggedIn }) {
    const [convoData, setConvoData] = useState({});
    const [currentUser, setCurrentUser] = useState("");
    const navigate = useNavigate();

    // function logUserIn(userObj) {
    //     fetch("http://localhost:3000/login", {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json", },
    //         body: JSON.stringify(userObj)
    //     })
    //         .then(res => {
    //             if (res.ok) {
    //                 console.log(res);
    //                 res.json().then(setCurrentUser(userObj.username));
    //                 getConversations(userObj.username);
    //                 setIsLoggedIn(true);
    //                 navigate("/chats");
    //             } else {
    //                 res.json().then(e => console.log(e))
    //             }
    //         });
    // }

    function getConversations(user) {
        fetch(`http://localhost:3000/myconversations?user=${user}`)
            .then(res => res.json())
            .then(data => {
                setConvoData(data)
                console.log(data)
            })
            .catch(e => console.error(e))
    }

    return (
        <main>
            {isLoggedIn ? (
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/chats" element={<Chats convoData={convoData} />} />
                    {/* <Route path="/login" element={<Login logUserIn={logUserIn} />} /> */}
                    <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
                    <Route path="/contacts" element={<Contacts />} />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
                ) : (
                <Routes>
                    <Route path="/signup" element={<SignUp setIsLoggedIn={setIsLoggedIn} />}/>
                    <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />}/>
                    <Route path="/" element={<Home />}/>
                </Routes>
                )
            }
        </main>
    )
};

export default Main;