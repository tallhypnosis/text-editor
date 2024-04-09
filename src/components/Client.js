import React from "react";
import {Avatar, AvatarBadge, AvatarGroup} from '@chakra-ui/react';

const Client = ({username}) => {
    return (
        <div className="client">
            <Avatar size='md' name={username} round="14px">
                <AvatarBadge boxSize='1.25em' bg='green.600'/>                    
            </Avatar>
            <span className="userName">{username}</span>
        </div>
    )
}

export default Client;