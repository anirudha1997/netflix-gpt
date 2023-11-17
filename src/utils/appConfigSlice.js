import { createSlice } from "@reduxjs/toolkit";

const appConfigSlice = createSlice({
  name: "appConfig",
  initialState: {
    lang: "en",
    muteStatus: true,
  },
  reducers: {
    changeLanguage: (state, action) => {
      state.lang = action.payload;
    },
    toggleMuteStatus: (state, action) => {
      if (action.payload) state.muteStatus = action.payload;
      else state.muteStatus = !state.muteStatus;
    },
  },
});

export const { changeLanguage, toggleMuteStatus } = appConfigSlice.actions;

export default appConfigSlice.reducer;
