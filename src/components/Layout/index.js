import { Box, Grid, GridItem } from "@chakra-ui/react";
import Nav from "../Nav";
import { useAuth0 } from "@auth0/auth0-react";

function Layout(props) {
  const { loginWithRedirect, logout, user, isAuthenticated, isLoading } =
    useAuth0();
  return (
    <Box
      display={"flex"}
      justifyContent="center"
      alignItems="center"
      flexBasis={"70%"}
    >
      {" "}
      <Grid
        border={"1px"}
        borderColor="blackAlpha.300"
        templateAreas={`"nav main"
                  "nav main"
                  "nav footer"`}
        gridTemplateRows={"50px 1fr 50px"}
        gridTemplateColumns={"1fr 5fr"}
        height="100vh"
        color="blackAlpha.700"
        fontWeight="bold"
        width="70%"
      >
        <GridItem area={"nav"}>
          <Nav></Nav>
        </GridItem>
        {!isLoading ? (
          <GridItem area={"main"}>{props.children} </GridItem>
        ) : (
          <>Loading...</>
        )}
        <GridItem
          pl="2"
          area={"footer"}
          borderTop={"2px"}
          borderColor={"gray.100"}
        >
          Footer
        </GridItem>
      </Grid>
    </Box>
  );
}

export default Layout;
