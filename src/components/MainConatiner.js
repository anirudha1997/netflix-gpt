import React from "react";
import MainMovieInfo from "./MainMovieInfo";
import MainMovieVideo from "./MainMovieVideo";
import { useSelector } from "react-redux";

const MainConatiner = () => {
  const nowPlayingMovies = useSelector(
    (store) => store.movies.nowPlayingMovies
  );

  if (!nowPlayingMovies) return;

  const bannerMovie = nowPlayingMovies[0];

  const { original_title, overview, id } = bannerMovie;

  return (
    <div>
      <MainMovieInfo title={original_title} description={overview} />
      <MainMovieVideo movieId={id} />
    </div>
  );
};

export default MainConatiner;
