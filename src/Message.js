
import React from 'react'
import {Card, CardContent, Typography} from '@material-ui/core';
import './Message.css'

function Message({username,message}) {
    const isUser=username===message.username;
    return (
        <div>
            <Card className={`message ${isUser&&'message__user'}`}>
                <CardContent>
                    <Typography color="white" variant="h5" component="h2">
                    {message.username}:{message.message}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}

export default Message
