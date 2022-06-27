import { Box, Avatar, AvatarBadge, Text } from "@chakra-ui/react";
import React from "react";

function UserInfo({ user }) {
  return (
    <Box my={2} p={2}>
      <Avatar borderRadius={"md"} src={user.picture}>
        <AvatarBadge boxSize="1.25em" bg="green.500" />
        {console.log(user.sub)}
      </Avatar>
      <Box display={"flex"} gap={"1"} flexDir={"column"}>
        <Text
          fontSize="16px"
          fontWeight={"700"}
          color={"background: #020100"}
          pt={1}
        >
          {user.name}
        </Text>
      </Box>
    </Box>
  );
}

export default UserInfo;
