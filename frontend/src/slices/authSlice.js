import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout: (state, action) => {
      state.user = null;
      //Note: as i have to remove the collapsed checklist state also
      localStorage.clear();
    },
  },
});
export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
