import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import companySlice from "./slices/compaySlice";
const appStore = configureStore({
  reducer: {
    auth: authSlice,
    company : companySlice
  },
});

export default appStore;
