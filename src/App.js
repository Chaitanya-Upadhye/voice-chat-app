import { Switch } from "react-router-dom";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { Route, Router } from "react-router-dom";
import RoomsList from "./components/Rooms/RoomsList";
function App() {
  return (
    <HashRouter>
      <Switch>
        <Route path="/" component={RoomsList} />
      </Switch>
    </HashRouter>
  );
}

export default App;
