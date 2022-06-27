import { ChatIcon } from "@chakra-ui/icons";
import { Box, Icon, Text } from "@chakra-ui/react";
import React from "react";
import UserInfo from "../UserInfo";
import { BsHouse, BsChatLeft } from "react-icons/bs";
import { useAuth0 } from "@auth0/auth0-react";

function Nav() {
  const { loginWithRedirect, logout, user, isAuthenticated, isLoading } =
    useAuth0();
  return (
    <Box
      height="100vh"
      px={2}
      display="flex"
      flexDir={"column"}
      borderRight={"2px"}
      borderRightColor={"blackAlpha.300"}
    >
      <Box flexBasis={"5%"}>
        {isAuthenticated ? <UserInfo user={user} /> : null}
      </Box>
      <Box flexGrow={1} my={2} gap={1}>
        <NavItem
          itemText="Clubs"
          IconComponent={() => <Icon height={"1em"} as={BsHouse} />}
        />
      </Box>
      {!isAuthenticated ? (
        <NavItem
          itemText="Login"
          IconComponent={() => <Icon height={"1em"} as={BsHouse} />}
          onClick={() => {
            loginWithRedirect();
          }}
        />
      ) : (
        <NavItem
          itemText="Logout"
          IconComponent={() => <Icon height={"1em"} as={BsHouse} />}
          onClick={() => {
            logout({ returnTo: `${window.location.origin}/login` });
          }}
        />
      )}
    </Box>
  );
}
function NavItem({
  onClick = () => {},
  itemText = "",
  IconComponent = () => <></>,
}) {
  return (
    <Box
      display={"flex"}
      gap={"4"}
      alignItems="center"
      onClick={onClick}
      my={2}
      borderRadius="md"
      p={2}
      _hover={{
        background: "gray.100",
        color: "teal.500",
        cursor: "pointer",
      }}
    >
      <IconComponent />
      <Text>{itemText}</Text>
    </Box>
  );
}
export default Nav;
