// After navigating away from home page to /chat page.
// Make sure to redirect someone from /chat to the home page if they are not signed in.

import React, { useEffect, useState } from 'react';
import background from '../resources/chatpage.jpg';
import { Box } from "@chakra-ui/react"
import { ChatState } from '../Context/ChatProvider';
import SideDrawer from '../components/misc/SideDrawer';
import UserChats from '../components/UserChats';
import ChatBox from '../components/ChatBox';

const ChatPage = () => {
  
  // destructure user information from context
  const { user } = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);

  return (
    <Box 
      width="100%"
      backgroundImage={`url(${background})`}
      height="100vh"
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      backgroundPosition={"center"}
      bgAttachment="fixed"
      overflowY={"scroll"}
    >
      {user && <SideDrawer />}
        <Box display="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
          {user && <UserChats fetchAgain={fetchAgain} />}
          {user && (<ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </Box>
  )
};

export default ChatPage;