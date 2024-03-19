import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "accessToken",
  initialState: {
    accessToken: "",
  },
  reducers: {
    setAccessToken(state, action) {
      state.accessToken = action.payload;
    },
  },
});

export const { setAccessToken } = authSlice.actions;
// export const selectAccessToken = (state) => state.auth.accessToken;
export const selectAccessToken = (state) => state.accessToken.accessToken;

export default authSlice.reducer;
