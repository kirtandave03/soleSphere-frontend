import { createSlice } from "@reduxjs/toolkit";

const passwordSlice = createSlice({
  name: "password",
  initialState: "",
  reducers: {
    setPassword(state, action) {
      return action.payload;
    },
  },
});

export const { setPassword } = passwordSlice.actions;
export const selectPassword = (state) => state.password;
export default passwordSlice.reducer;
