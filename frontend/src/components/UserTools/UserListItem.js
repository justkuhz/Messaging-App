import React from "react";
import { Avatar, Box, Text } from "@chakra-ui/react";

const UserListItem = ({ user, handleFunction }) => {
  return (
    <Box
      onClick={handleFunction}
      cursor="pointer"
      bg="#E8E8E8"
      _hover={{
        background: "whatsapp.500",
        color: "white",
      }}
      w="100%"
      display="flex"
      alignItems="center"
      color="black"
      paddingX={3}
      paddingY={2}
      marginBottom={2}
      borderRadius="lg"
    >
      <Avatar
        marginRight={2}
        size="sm"
        cursor="pointer"
        name={user.name}
        src={user.picture}
      />
      <Box>
        <Text>{user.name}</Text>
        <Text fontSize="xs">
          <b>Email : </b>
          {user.email}
        </Text>
      </Box>
    </Box>
  );
};

export default UserListItem;
