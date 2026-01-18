import React from "react";
import MoviesList from "./MoviesList";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
  const nowPlayingMovies = useSelector(
    (store) => store.movies.nowPlayingMovies,
  );
  const popularMovies = useSelector((store) => store.movies.popularMovies);
  const upcomingMovies = useSelector((store) => store.movies.upcomingMovies);

  if (!nowPlayingMovies || !popularMovies || !upcomingMovies) return null;

  return (
    <div className="bg-black relative z-20 -mt-20">
      <div className="pl-4 md:pl-8 lg:pl-12 pb-12">
        <MoviesList title="Now Playing" moviesData={nowPlayingMovies} />
        <MoviesList title="Upcoming" moviesData={upcomingMovies} />
        <MoviesList title="Popular" moviesData={popularMovies} />
      </div>
    </div>
  );
};

export default SecondaryContainer;
