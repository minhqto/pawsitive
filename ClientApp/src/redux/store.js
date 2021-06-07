import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter";
import authReducer from "./auth";

export default configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
  },
});
