import React from "react";

import { Route, Redirect, useHistory } from "react-router-dom";

import { useAuth0 } from "@auth0/auth0-react";

export default function AuthorizedRoute({ component: Component, ...rest }) {
  const history = useHistory();
  const { loginWithRedirect, logout, user, isAuthenticated, isLoading } =
    useAuth0();
  return (
    <Route
      history={history}
      {...rest}
      render={(props) => {
        if (isAuthenticated) {
          return <Component />;
        }

        return (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        );
      }}
    />
  );
}
