import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    mainMovieVideos: null,
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    mainMovieVideo: (state, action) => {
      state.mainMovieVideos = action.payload;
    },
  },
});

export const { addNowPlayingMovies, mainMovieVideo } = moviesSlice.actions;

export default moviesSlice.reducer;
