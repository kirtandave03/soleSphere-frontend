import { configureStore } from "@reduxjs/toolkit";
import emailReducer from "./features/emailSlice";
import authReducer from "./features/authSlice";

export default configureStore({
  reducer: {
    email: emailReducer,
    accessToken: authReducer,
  },
});
