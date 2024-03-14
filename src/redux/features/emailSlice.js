import { createSlice } from "@reduxjs/toolkit";

const emailSlice = createSlice({
  name: "email",
  initialState: "",
  reducers: {
    setEmail(state, action) {
      return action.payload;
    },
  },
});

export const { setEmail } = emailSlice.actions;
export const selectEmail = (state) => state.email;
export default emailSlice.reducer;
