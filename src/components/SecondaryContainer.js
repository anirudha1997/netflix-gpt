import React from "react";
import MoviesList from "./MoviesList";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
  const nowPlayingMovies = useSelector(
    (store) => store.movies.nowPlayingMovies
  );
  const popularMovies = useSelector((store) => store.movies.popularMovies);
  const upcomingMovies = useSelector((store) => store.movies.upcomingMovies);

  if (!nowPlayingMovies || !popularMovies || !upcomingMovies) return;

  return (
    <div className="bg-black relative pt-8 xl:pt-0 xl:-mt-16">
      <div className="pl-10 top-2 w-full bg-black xl:bg-transparent">
        <MoviesList title="Now Playing" moviesData={nowPlayingMovies} />
        <MoviesList title="Upcoming" moviesData={upcomingMovies} />
        <MoviesList title="Popular" moviesData={popularMovies} />
      </div>
    </div>
  );
};

export default SecondaryContainer;
