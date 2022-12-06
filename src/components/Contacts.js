import * as React from 'react';
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";

function Contacts() {
    React.useEffect(() => {
        fetch("/mycontacts")
            .then(r => r.json())
            .then(console.log)
    }, [])

    return (
        <div>
            <Card>
                <CardHeader title="My Contacts" />
                <CardContent>

                </CardContent>

            </Card>
        </div>
    )
}

export default Contacts