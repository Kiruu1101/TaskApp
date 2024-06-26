import { USER_URL } from "../utils/baseUrls";
import { apiSlice } from "./apiSlice";

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (registerData) => ({
        url: `${USER_URL}/register`,
        method: "POST",
        body: registerData,
      }),
    }),
    login: builder.mutation({
      query: (loginData) => ({
        url: `${USER_URL}/login`,
        method: "POST",
        body: loginData,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USER_URL}/logout`,
        method: "POST",
      }),
    }),
    updateUser: builder.mutation({
      query: (fieldsToUpdate) => ({
        url: `${USER_URL}/update`,
        method: "PATCH",
        body: fieldsToUpdate,
      }),
    }),
  }),
});

export const {
  useSignUpMutation,
  useLogoutMutation,
  useLoginMutation,
  useUpdateUserMutation,
} = authApiSlice;
