import * as React from 'react';
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import AddContacts from './AddContacts';
import {useState, useEffect} from 'react'

function Contacts() {
    const [contactsList, setContactsList] = useState([]) 
    useEffect(() => {
        fetch("/mycontacts")
            .then(r => r.json())
            .then(json=> setContactsList(json[0]))
            console.log(contactsList)
    }, [])

    return (
        <div>
            <Card>
                <CardHeader title="My Contacts" />
                <AddContacts/>
                <CardContent>

                </CardContent>

            </Card>
        </div>
    )
}

export default Contacts