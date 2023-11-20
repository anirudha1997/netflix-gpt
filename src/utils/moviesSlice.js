import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    popularMovies: null,
    upcomingMovies: null,
    movieTrailer: {},
    mainMovieVideos: null,
    showIframe: false,
    genres: null,
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
    addUpcomingMovies: (state, action) => {
      state.upcomingMovies = action.payload;
    },
    addMovieVideos: (state, action) => {
      state.movieTrailer = Object.assign(state.movieTrailer, action.payload);
    },
    clearMovieVideos: (state) => {
      state.movieTrailer = {};
    },
    updateMainMovieVideo: (state, action) => {
      state.mainMovieVideos = action.payload;
    },
    setShowIframe: (state, action) => {
      state.showIframe = action.payload;
    },
    addGenres: (state, action) => {
      state.genres = action.payload;
    },
  },
});

export const {
  addNowPlayingMovies,
  addPopularMovies,
  addUpcomingMovies,
  addMovieVideos,
  clearMovieVideos,
  updateMainMovieVideo,
  setShowIframe,
  addGenres,
} = moviesSlice.actions;

export default moviesSlice.reducer;
