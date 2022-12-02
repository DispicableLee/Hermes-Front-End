import * as React from "react";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Login from './Login';
import Home from './Home';
import Chats from './Chats';
import Contacts from './Contacts';
import Profile from './Profile';

function Main( { isLoggedIn }) {
    const [convoData, setConvoData] = useState({});

    useEffect(() => {
        fetch("http://localhost:3000/conversations/3")
            // must change to sessions ID
            .then((res) => res.json())
            .then((data) => setConvoData(data))
        }, [])

        function logUserIn(userObj) {
        console.log('loggin in')
        // fetch("http://localhost:3000/")
        }

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chats" element={<Chats convoData={convoData} />} />
            <Route path="/login" element={<Login logUserIn={logUserIn} />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/profile" element={<Profile />} />
        </Routes>
    )
};

export default Main;