import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Example to show how to setup reducers and actions
export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {},
    isAuthenticated: false,
  },
  reducers: {
    setCurrentUser: (state, action) => {
      let isObjectEmpty = Object.keys(action.payload).length === 0;
      state.user = action.payload;
      state.isAuthenticated = !isObjectEmpty;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCurrentUser } = authSlice.actions;

export default authSlice.reducer;
