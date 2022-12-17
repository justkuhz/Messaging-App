// Displaying chat window

import React, { useEffect, useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import {
  Box,
  FormControl,
  IconButton,
  Input,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { getSender, getSenderProfile } from "../config/ChatLogic";
import ProfileModal from "./misc/ProfileModal";
import UpdateGroupChatModal from "./misc/UpdateGroupChatModal";
import axios from "axios";
import "./styles.css";
import ScrollableChat from "./ScrollableChat";

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  // import context
  const { user, selectedChat, setSelectedChat } = ChatState();
  const toast = useToast();

  // use states
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState();

  // sending messages into a chat
  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      try {
        // authorization to access endpoint api
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };

        // post new message via api endpoint
        setNewMessage("");
        const { data } = await axios.post(
          "/api/message",
          {
            content: newMessage,
            chatID: selectedChat._id,
          },
          config
        );

        setMessages([...messages, data]);
      } catch (error) {
        toast({
          title: "Error Occurred!",
          description: "Failed to send message",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  // handle user typing into a chat
  const typingHandler = (event) => {
    setNewMessage(event.target.value);

    // Typing indicator logic here "..."
  };

  // Retrieve messages for the chat
  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      // get authorization to access api endpoint
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      setLoading(true);

      // api GET to pull all messaged for a particular chat id
      const { data } = await axios.get(
        `/api/message/${selectedChat._id}`,
        config
      );

      console.log(data);
      setMessages(data);
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to load messages",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
    setLoading(false);
  };

  // Whenever something in selectedChat state changes, fetch all messages for the chat
  useEffect(() => {
    fetchMessages();
  }, [selectedChat]);

  // If no chat is selected, interface tells us to select one to begin
  // Otherwise, we display the selected chat
  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            paddingBottom={3}
            paddingX={2}
            width="100%"
            fontFamily={"Work sans"}
            display="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            <IconButton
              display={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            />
            {!selectedChat.isGroupChat ? (
              <>
                {getSender(user, selectedChat.users)}
                <ProfileModal
                  user={getSenderProfile(user, selectedChat.users)}
                />
              </>
            ) : (
              <>
                {selectedChat.chatName}
                <UpdateGroupChatModal
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                  fetchMessages={fetchMessages}
                />
              </>
            )}
          </Text>
          <Box
            display={"flex"}
            flexDir="column"
            justifyContent={"flex-end"}
            padding={3}
            bg="#E8E8E8"
            width="100%"
            height="100%"
            borderRadius="lg"
            overflowY="hidden"
          >
            {loading ? (
              <Spinner
                size="xl"
                width={20}
                height={20}
                alignSelf="center"
                margin={"auto"}
              />
            ) : (
              <div className="messages">
                <ScrollableChat messages={messages} />
              </div>
            )}
            <FormControl onKeyDown={sendMessage} isRequired marginTop={3}>
              <Input
                variant={"filled"}
                background="#E0E0E0"
                placeholder="Enter a message..."
                onChange={typingHandler}
                value={newMessage}
              />
            </FormControl>
          </Box>
        </>
      ) : (
        <Box
          display={"flex"}
          alignItems="center"
          justifyContent={"center"}
          height="100%"
        >
          <Text fontSize={"3xl"} paddingBottom={3} fontFamily="Work sans">
            Select a user to begin chatting
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
