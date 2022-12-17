import { CloseIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/react";
import React from "react";

const UserBadgeItem = ({ user, handleFunction }) => {
  return (
    <Box
      paddingX={2}
      paddingY={1}
      borderRadius="lg"
      margin={1}
      marginBottom={2}
      fontSize={12}
      backgroundColor="whatsapp.500"
      color={"white"}
      cursor={"pointer"}
      onClick={handleFunction}
    >
      {user.name}
      <CloseIcon paddingLeft={1} />
    </Box>
  );
};

export default UserBadgeItem;
