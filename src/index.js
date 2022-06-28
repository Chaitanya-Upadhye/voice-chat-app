import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Layout from "./components/Layout";
import { ChakraProvider } from "@chakra-ui/react";
import { Auth0Provider } from "@auth0/auth0-react";
import { Peer } from "peerjs";
import SessionContext from "./Contexts/SessionContext";
const { io } = require("socket.io-client");

const peer = new Peer();
const socket = io("http://172.104.207.58:8080");
const socketEventhandlers = {
  userJoinedRoom: (cb) => socket.on("user-joined-room", cb),
  userLeftRoom: (cb) => socket.on("user-left-room", cb),
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SessionContext.Provider value={{ peer, socket, socketEventhandlers }}>
      <Auth0Provider
        domain="dev-u202gyq4.us.auth0.com"
        clientId="L9xACe4j4C19tpH3on66RJAa7O0eRRgj"
        redirectUri={`${window.location.origin}/callback`}
      >
        <ChakraProvider>
          <Layout>
            <App />
          </Layout>
        </ChakraProvider>
      </Auth0Provider>
    </SessionContext.Provider>
  </React.StrictMode>
);

reportWebVitals();
