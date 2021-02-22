import React, { forwardRef }  from 'react';
import {Card, CardContent, Typography} from '@material-ui/core';
import './Message.css';

const Message=forwardRef(({username,message}, ref) => {
    const isUser=username===message.username;
    return (
            <Card ref={ref} className={`message ${isUser&&'message__user'}`}>
                <CardContent>
                    <Typography color="textPrimary" variant="h6" component="h6">
               {!isUser && `${message.username || 'Unknown User'}: `}
            {message.message}
                    </Typography>
                </CardContent>
            </Card>
    )
})

export default Message
