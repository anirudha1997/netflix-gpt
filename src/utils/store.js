import { configureStore } from "@reduxjs/toolkit";
import userDataReducer from "./userSlice";
import moviesReducer from "./moviesSlice";

const appStore = configureStore({
  reducer: {
    user: userDataReducer,
    movies: moviesReducer,
  },
});

export default appStore;
