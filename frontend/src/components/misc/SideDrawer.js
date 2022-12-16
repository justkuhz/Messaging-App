import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spinner,
  Text,
  Toast,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { ChatState } from "../../Context/ChatProvider";
import ProfileModal from "./ProfileModal";
import { useHistory } from "react-router-dom";
import axios from "axios";
import ChatLoading from "../ChatLoading";
import UserListItem from "../UserListItem";

const SideDrawer = () => {
  // Different use states for the side drawer
  const [search, setSearch] = useState(""); // Search bar function
  const [searchResult, setSearchResult] = useState([]); // Search bar results function
  const [loading, setLoading] = useState(false); // Search Loading function
  const [loadingChat, setLoadingChat] = useState(); // Chat Loading function

  // Different window states
  const { isOpen, onOpen, onClose } = useDisclosure();

  //Instantiate toast
  const toast = useToast();

  // Instantiate history
  const history = useHistory();

  // Get Chat Context
  const { user, setSelectedChat, chats, setChats } = ChatState();

  // Logout handler function
  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    history.push("/");
  };

  // Handle search function
  const handleSearch = async () => {
    // throw error if search field is empty
    if (!search) {
      toast({
        title: "Please fill out the search field",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    // api call for searching for a user
    try {
      setLoading(true);

      // Get authorization using jwt token to access/search users in db
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      // api endpoint for getting users with accepted search query
      const { data } = await axios.get(`/api/user?search=${search}`, config);

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to load search results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  // access or create chat with a user from search
  const accessChat = async (userID) => {
    try {
      setLoadingChat(true);

      // configuration to reach api endpoint
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      // Make api post to create a chat or return an existing one
      const { data } = await axios.post("/api/chat", { userID }, config);

      // If we already have an existing chat, we append the data for the new chat to the existing one
      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);

      // Send data to main chat window
      setSelectedChat(data);
      setLoading(false);
      onClose(); // close side drawer
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
      >
        <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
          <Button variant="ghost" onClick={onOpen}>
            <i className="fas fa-search"></i>
            <Text display={{ base: "none", md: "flex" }} padding="2">
              Search User
            </Text>
          </Button>
        </Tooltip>

        <Text fontSize="3xl" fontFamily={"Work sans"}>
          Messaging App
        </Text>

        <div>
          <Menu>
            <MenuButton padding={1}>
              <BellIcon boxSize={6} margin="1" />
            </MenuButton>
            {/* <MenuList>
                            Notifications display
                        </MenuList> */}
          </Menu>

          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              <Avatar
                size="sm"
                cursor="pointer"
                src={user.picture}
                alt={user.name}
              />
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
                <MenuItem>My Profile</MenuItem>
              </ProfileModal>
              <MenuDivider />
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth={"1px"}>Search Users</DrawerHeader>
          <DrawerBody>
            <Box display={"flex"} paddingBottom="2">
              <Input
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleSearch}>Go</Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat && <Spinner ml="auto" display="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;
