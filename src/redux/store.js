import { configureStore } from "@reduxjs/toolkit";
import emailReducer from "./features/emailSlice";

export default configureStore({
  reducer: {
    email: emailReducer,
  },
});
