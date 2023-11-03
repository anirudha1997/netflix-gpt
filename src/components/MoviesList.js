import React from "react";
import MovieCard from "./MovieCard";

const MoviesList = ({ title, moviesData }) => {
  return (
    <div className="py-4">
      <h1 className="text-2xl font-semibold text-white mb-3">{title}</h1>
      <div className="flex overflow-x-scroll">
        {moviesData?.map((movie) => (
          <MovieCard posterId={movie.poster_path} />
        ))}
      </div>
    </div>
  );
};

export default MoviesList;
