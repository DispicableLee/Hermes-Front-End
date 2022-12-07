import * as React from "react";
import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Login from './Login';
import Home from './Home';
import Chats from './Chats';
import Contacts from './Contacts';
import Profile from './Profile';
import SignUp from "./SignUp";

function Main({ user, setUser }) {
    const [convoData, setConvoData] = useState({});
    const [reRun, setReRun] = useState(false);

    useEffect(() => {
        // console.log("In Main.js:", reRun)
        fetch(`/myconversations`)
            .then(res => res.json())
            .then(data => {
                setConvoData(data)
                // console.log(data)
            })
            .catch(e => console.error(e))
    }, [reRun])

    function getConversations() {
        fetch(`/myconversations`)
            .then(res => res.json())
            .then(data => {
                setConvoData(data)
                // console.log(data)
            })
            .catch(e => console.error(e))
    }

    return (
        <main>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/chats" element={<Chats
                    user={user}
                    convoData={convoData}
                    getConversations={getConversations}
                    reRun={reRun}
                    setReRun={setReRun}
                />} />
                <Route path="/login" element={<Login
                    user={user}
                    setUser={setUser}
                    getConversations={getConversations} />} />
                <Route path="/signup" element={<SignUp setUser={setUser} />} />
                <Route path="/contacts" element={<Contacts user={user} />} />
                <Route path="/profile" element={<Profile user={user} setUser={setUser} />} />
            </Routes>
        </main>
    )
};

export default Main;