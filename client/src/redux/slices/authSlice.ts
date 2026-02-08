import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    startLogin(state) {
      state.isAuthenticated = true;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});

export const { startLogin, setUser } = authSlice.actions;
export default authSlice.reducer;