import { configureStore } from "@reduxjs/toolkit";
import userDataReducer from "./userSlice";

const appStore = configureStore({
  reducer: {
    user: userDataReducer,
  },
});

export default appStore;
