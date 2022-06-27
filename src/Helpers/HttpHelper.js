import axios from "axios";
import { authService } from "../Services/AuthService";
const defaultHeaders = { ContentType: "application/json" };

const axiosClient = axios.create({
  baseURL: "", //get from constants
});

axiosClient.interceptors.request.use((req) => {
  req.headers["Authorization"] = `Bearer ` + authService.currentUserValue;
  return req;
});

axiosClient.interceptors.response.use(handleResponse, function (error) {
  let res = error.response;
  if (res.status === 401) {
    authService.logout();

    window.location.href = `${window.location.origin}/login`; // `${baseUrl}/login`
  }
  return Promise.reject(error);
});

export const HttpHelper = {
  Get: async (url, params = {}, headers = defaultHeaders) =>
    axiosClient.get(url, { headers, params }),
  Post: async (url, data = {}, headers = defaultHeaders) =>
    axiosClient.post(url, data, { headers }),
  AxiosInstance: axiosClient,
};
function handleResponse(response) {
  if ([401, 403].indexOf(response.status) !== -1) {
    // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
    return Promise.reject(response);
  }

  return response;
}
