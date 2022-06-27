// import { HttpHelper } from "../Helpers/HttpHelper";
import jwt_decode from "jwt-decode";

import { API_ROUTES } from "../Constants/AppConstants";
const currentUser = localStorage.getItem("currentUser");

// const { Get, Post } = HttpHelper;

async function login(username, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: username, password }),
  };

  const response = await fetch(API_ROUTES.authenticate, requestOptions);
  const data = await response.json();
  if (!response.ok) {
    if ([401, 403].indexOf(response.status) !== -1) {
      // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
    }

    const error = (data && data.message) || response.statusText;
    return Promise.reject(error);
  }
  const user = data;
  if (!user.isAuthenticated) return Promise.reject(data.message);

  localStorage.setItem("currentUser", user?.token);
  return user;
}

async function register(params) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  };

  try {
    const response = await fetch(API_ROUTES.register, requestOptions);
    const data = await response.json();
    if (!response.ok) {
      if (response.status === 400) {
        return Promise.reject(
          data.reduce((prev, curr) => {
            return prev.description
              ? `${prev.description}<br/> ${curr.description}`
              : curr.description;
          }, "")
        );
      }
      console.log(data);
      return Promise.reject("Something went wrong.");
    }

    return data;
  } catch (err) {
    return Promise.reject(err);
  }
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("currentUser");
}

export const authService = {
  login,
  logout,
  register,
  currentUser: currentUser,
  get currentUserValue() {
    return localStorage.getItem("currentUser");
  },
  getDecodedUserObj: () => {
    let token = localStorage.getItem("currentUser");
    if (token) {
      const user = jwt_decode(token);
      const isAdmin = user?.roles.includes("Administrator");
      jwt_decode(token);
      return { ...user, isAdmin };
    }

    return {};
  },
};
