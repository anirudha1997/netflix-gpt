import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gptSearch",
  initialState: {
    toggleGPTSearch: false,
  },
  reducers: {
    toggleGPT: (state) => {
      state.toggleGPTSearch = !state.toggleGPTSearch;
    },
  },
});

export const { toggleGPT } = gptSlice.actions;

export default gptSlice.reducer;
