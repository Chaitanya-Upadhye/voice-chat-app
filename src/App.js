import { Box } from "@chakra-ui/react";
import { Switch } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { Route, Router } from "react-router-dom";
import Login from "./components/Login";
import RoomsList from "./components/Rooms/RoomsList";
import AuthorizedRoute from "./components/Routes/AuthorizedRoute";
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={RoomsList} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
