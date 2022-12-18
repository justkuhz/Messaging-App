import React, { useEffect, useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import {
  Box,
  Button,
  PopoverAnchor,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { AddIcon } from "@chakra-ui/icons";
import ChatLoading from "./ChatLoading";
import { getSender } from "../config/ChatLogic";
import GroupChatModal from "./misc/GroupChatModal";

const UserChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();
  const { user, selectedChat, setSelectedChat, chats, setChats } = ChatState();

  const toast = useToast();

  // Fetch chats from api endpoint for a user
  const fetchChats = async () => {
    try {
      // Set configuration to gain authorization to call api endpoint
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      // Call the api endpoint using out configuration
      const { data } = await axios.get("/api/chat", config);
      console.log(data);
      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to load chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  // Grab userInfo from local storage and then use that to get the user's chats
  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, [fetchAgain]);

  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems={"center"}
      padding="2"
      background={"white"}
      width={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth={"5px"}
    >
      <Box
        paddingBottom={"3"}
        paddingX={"3"}
        fontSize={{ base: "28px" }}
        fontFamily="Work Sans"
        display={"flex"}
        width="100%"
        justifyContent={"space-between"}
        alignItems="center"
      >
        My Chats
        <GroupChatModal>
          <Button
            display={"flex"}
            fontSize={{ base: "15px" }}
            rightIcon={<AddIcon />}
          >
            New Group Chat
          </Button>
        </GroupChatModal>
      </Box>

      <Box
        display={"flex"}
        flexDir="column"
        padding={"3"}
        background="#F8F8F8"
        width={"100%"}
        height="100%"
        borderRadius={"lg"}
        overflowY="hidden"
      >
        {chats ? (
          <Stack overflowY="scroll">
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                background={selectedChat === chat ? "whatsapp.500" : "#E8E8E8"}
                color={selectedChat === chat ? "white" : "black"}
                paddingX={"3"}
                paddingY={"2"}
                borderRadius="lg"
                key={chat._id}
              >
                <Text>
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </Text>
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default UserChats;
