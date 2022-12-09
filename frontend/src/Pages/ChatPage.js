// After navigating away from home page to /chat page.
// Make sure to redirect someone from /chat to the home page if they are not signed in.

import React, { useEffect, useState } from 'react'
import axios from "axios";

const ChatPage = () => {
    const [chats, setChats] = useState([]);

    const fetchChats = async () => {
        const { data } = await axios.get('/api/chat');

        setChats(data);
    } ;
    
    useEffect(() => {
        fetchChats();
    }, []);
    
  return <div>{chats.map(chat=> (
  <div key = {chat._id}>{ chat.chatName }</div>
  ))}</div>;
};

export default ChatPage