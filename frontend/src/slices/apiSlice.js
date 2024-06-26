import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../utils/baseUrls";
import { logout } from "./authSlice";
import toast from "react-hot-toast";
const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
});
// If token is deleted or expires and server send 401 error this will remove user from localstorage

async function baseQueryWithAuth(arg, api, extra) {
  const result = await baseQuery(arg, api, extra);
  if (result.error && result.error.status === 401) {
    api.dispatch(logout());
    toast.error("Your token is expired, please login again");
  }
  return result;
}
export const apiSlice = createApi({
  baseQuery: baseQueryWithAuth,
  tagTypes: ["Tags", "User"],
  endpoints: (builder) => ({}),
});
