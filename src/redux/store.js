import { configureStore } from "@reduxjs/toolkit";
import emailReducer from "./features/emailSlice";
import authReducer from "./features/authSlice";
import passwordReducer from "./features/passwordSlice";

export default configureStore({
  reducer: {
    email: emailReducer,
    accessToken: authReducer,
    password: passwordReducer,
  },
});
