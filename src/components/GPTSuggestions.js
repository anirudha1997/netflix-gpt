import React from "react";
import { useSelector } from "react-redux";
import MoviesList from "./MoviesList";

const GPTSuggestions = () => {
  const { searchMovieTitles, searchMovieResults, loadingState } = useSelector(
    (store) => store.gptSearch
  );

  if (loadingState)
    return (
      <div className="relative z-40 flex justify-center items-center">
        <div className="text-2xl text-red-500 font-bold -mt-72">Loading...</div>
      </div>
    );

  return (
    searchMovieTitles &&
    searchMovieResults && (
      <div className="relative z-40 pl-10 -mt-56">
        {searchMovieTitles.map((movie, index) => (
          <MoviesList
            key={movie}
            title={"Movies related to the title '" + movie + " '"}
            moviesData={searchMovieResults[index]}
          />
        ))}
      </div>
    )
  );
};

export default GPTSuggestions;
