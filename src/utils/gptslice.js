import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gptSearch",
  initialState: {
    toggleGPTSearch: false,
    searchMovieTitles: null,
    searchMovieResults: null,
    loadingState: false,
  },
  reducers: {
    toggleGPT: (state) => {
      state.toggleGPTSearch = !state.toggleGPTSearch;
    },
    addSearchMovieResults: (state, action) => {
      const { movieTitles, movieResults } = action.payload;
      state.searchMovieTitles = movieTitles;
      state.searchMovieResults = movieResults;
    },
    resetSearchData: (state) => {
      state.searchMovieTitles = null;
      state.searchMovieResults = null;
    },
    setLoadingState: (state, action) => {
      state.loadingState = action.payload;
    },
  },
});

export const {
  toggleGPT,
  addSearchMovieResults,
  resetSearchData,
  setLoadingState,
} = gptSlice.actions;

export default gptSlice.reducer;
