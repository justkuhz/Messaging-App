// After navigating away from home page to /chat page.
// Make sure to redirect someone from /chat to the home page if they are not signed in.

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import background from '../resources/chatpage.jpg';

const ChatPage = () => {
    
    return <div style={{
        width: "100%",
        backgroundImage: `url(${background})`,
        height: "100vh",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
    }}>
      
  </div>;
};

export default ChatPage;