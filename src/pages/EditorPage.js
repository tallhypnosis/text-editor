import React, {useEffect, useState, useRef} from "react";
import toast from 'react-hot-toast';
import Client from "../components/Client";
import {Button} from "@chakra-ui/react";
import Editor from '../components/Editor'
import { initSocket } from "../socket";
import ACTIONS from "../Actions";
import {useLocation, useNavigate, Navigate, useParams} from 'react-router-dom';
 const EditorPage = () => {

    const socketRef = useRef(null);
    const location = useLocation();
    const {roomId} = useParams();
    const reactNavigator = useNavigate();
    const [clients, setClients] = useState([]);
    useEffect (() => {
        const init = async () => {
            socketRef.current = await initSocket();
            socketRef.current.on('connect_error', (err) => handleErrors(err));
            socketRef.current.on('connect_failed', (err) => handleErrors(err));

            function handleErrors(e) {
                console.log('socket error', e);
                toast.error('Socket connection failed, try again later.');
                reactNavigator('/');
            }
            socketRef.current.emit(ACTIONS.JOIN,{
                roomId,
                username: location.state.username,
            });

            // Listening for joined event
            socketRef.current.on(ACTIONS.JOINED, (clients, username, socketId) => {
                if (username !== location.state?.username) {
                    toast.success(`{username} has joined the room`);
                }
                setClients(clients);
            })
        };
        init();
    }, []);

if(!location.state){
    <Navigate to="/" />
}

    return (
        <div className="mainWrap">
            <div className="aside">
                <div className="asideInner">
                    <div className="logo">
                        <img className="logoImage" src="/code-sync.png" alt="logo" />
                    </div>
                    <h3>Connected</h3>
                    <div className="clientsList">
                        {
                            clients.map((client) => (
                                <Client key={client.socketId} username={client.username}/>
                            ))
                        }
                    </div>
                </div>
                <Button className="btn copyBtn">Copy ROOM ID</Button>
                <Button colorScheme= {{ bg: "#4aed88" }} _hover={{ bg: "#2b824c" }} className="btn leaveBtn">Leave</Button>
            </div>
            <div className="editorWrap">
                <Editor/>  
            </div>
        </div>
    )
 }

 export default EditorPage;