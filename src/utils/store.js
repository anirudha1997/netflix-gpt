import { configureStore } from "@reduxjs/toolkit";
import userDataReducer from "./userSlice";
import moviesReducer from "./moviesSlice";
import gptReducer from "./gptslice";
import appConfigReducer from "./appConfigSlice";

const appStore = configureStore({
  reducer: {
    user: userDataReducer,
    movies: moviesReducer,
    gptSearch: gptReducer,
    appConfig: appConfigReducer,
  },
});

export default appStore;
