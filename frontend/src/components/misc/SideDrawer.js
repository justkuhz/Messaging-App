import { Avatar, Box, Button, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text, Tooltip, useDisclosure } from '@chakra-ui/react';
import React, { useState } from 'react';
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { ChatState } from '../../Context/ChatProvider';
import ProfileModal from "./ProfileModal";

const SideDrawer = () => {
    // Different use states for the side drawer
    const [search, setSearch] = useState("");              // Search bar function
    const [searchResult, setSearchResult] = useState([]);  // Search bar results function
    const [loading, setLoading] = useState(false);         // Search Loading function
    const [loadingChat, setLoadingChat] = useState();      // Chat Loading function

    // Different window state
    const { isOpen, onOpen, onClose } = useDisclosure();

    // Get Chat Context
    const { user } = ChatState();

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
                                size='sm'
                                cursor='pointer'
                                src={user.pic}
                                alt={user.name}
                            />
                        </MenuButton>
                        <MenuList>
                            <ProfileModal user={user}>
                                <MenuItem>My Profile</MenuItem>
                            </ProfileModal>
                            <MenuDivider/>
                            <MenuItem>Logout</MenuItem>
                        </MenuList>
                    </Menu>
                </div>
            </Box>
        </>
    )
};

export default SideDrawer;