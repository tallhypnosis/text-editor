import React, { useState } from "react";
import {v4 as uuidv4} from 'uuid';
import toast from 'react-hot-toast';
import {Navigate, useNavigate} from 'react-router-dom';
import { Box, Button, Input, Link, Text, ChakraProvider, extendBaseTheme } from "@chakra-ui/react";
const Home = () => {
    
    const navigate = useNavigate();
    const [roomId, setRoomId] = useState('');
    const [username, setUserName] = useState('');

        const createNewRoom = (e) => {
          e.preventDefault();
          const id = uuidv4();
          setRoomId(id);  
          toast.success('Created a new room');
        };

    const joinRoom = () => {
        if(!roomId || !username){
            toast.error('ROOM ID & is required');
            return;
        }

        navigate(`/editor/${roomId}`, {
            state: {
                username,
            }
        })
    }
    
    const inputEnter = (e) => {
        if (e.code === 'Enter') {
            joinRoom();
        }
    };
    return (

        <div className="homePageWrapper">
            <div className="formWrapper">
                <img 
                className="homePageLogo"
                src="/code-sync.png" 
                alt="code-sync-logo"
                />
                <h4 
                className="mainLabel">Paste invitation ROOM ID</h4>
                <div 
                className="inputGroup">
                    <input 
                    type="text" 
                    className="inputBox" 
                    placeholder="ROOM ID"
                    onChange={(e) => setRoomId(e.target.value)}
                    value={roomId}
                    />
                    <input 
                    type="text" 
                    className="inputBox" 
                    placeholder="USERNAME"
                    onChange={(e) => setUserName(e.target.value)}
                    value={username}
                    onKeyUp={inputEnter}
                    />
                    <Button
                    colorScheme= {{ bg: "#4aed88" }} 
                    className="btn joinBtn"
                    _hover={{ bg: "#2b824c" }}
                    onClick={joinRoom}
                    onKeyUp={inputEnter}
                    >Join</Button>
                    <span className="createInfo">
                        If you don't have an invite then create &nbsp;
                        <a onClick= {createNewRoom} href="" className="createNewBtn">
                            new room
                        </a>
                    </span>
                </div>
            </div>
            <footer>
                <h4>Build with 💛 &nbsp; by &nbsp; 
                     <a href="">Yash</a></h4>
            </footer>
        </div>
        
    )
 }

export default Home;