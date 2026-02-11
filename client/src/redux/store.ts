import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import companySlice from "./slices/companySlice";
const appStore = configureStore({
  reducer: {
    auth: authSlice,
    company : companySlice
  },
});

export default appStore;
