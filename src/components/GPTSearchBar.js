import React, { useRef } from "react";
import { gptSearchConstants } from "../utils/langConstants";
import { useSelector } from "react-redux";
import { openai } from "./../utils/openai";
import { TMDB_options } from "./../utils/conatants";
import { useDispatch } from "react-redux";
import { addSearchMovieResults, setLoadingState } from "./../utils/gptslice";

const GPTSearchBar = () => {
  const appLanguage = useSelector((store) => store.appConfig.lang);
  const searchInput = useRef(null);
  const dispatch = useDispatch();

  const searchHandler = async () => {
    if (!searchInput.current.value.trim()) return;

    dispatch(setLoadingState(true));

    try {
      const gptQuery =
        "Act as a movie recommendation system for this query: " +
        searchInput.current.value +
        ". Give me exactly 8 movie names which are comma separated. Only provide movie names, nothing else. Example format: Movie1,Movie2,Movie3,Movie4,Movie5,Movie6,Movie7,Movie8";

      const data = await openai.chat.completions.create({
        messages: [{ role: "user", content: gptQuery }],
        model: "gpt-4o",
        max_tokens: 50,
      });

      const results = data.choices[0].message.content.trim();
      const movieTitles = results.split(",").map((title) => title.trim());

      const promiseArray = movieTitles.map((movie) => searchInTMDB(movie));
      const movieResults = await Promise.all(promiseArray);

      // Filter out empty results
      const validResults = movieTitles
        .map((title, index) => ({
          title,
          movies: movieResults[index],
        }))
        .filter((item) => item.movies && item.movies.length > 0);

      dispatch(
        addSearchMovieResults({
          movieTitles: validResults.map((item) => item.title),
          movieResults: validResults.map((item) => item.movies),
        }),
      );
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      dispatch(setLoadingState(false));
    }
  };

  const searchInTMDB = async (movie_name) => {
    try {
      const data = await fetch(
        "https://api.themoviedb.org/3/search/movie?query=" +
          encodeURIComponent(movie_name) +
          "&include_adult=false&page=1",
        TMDB_options,
      );
      const json = await data.json();

      // Try to find exact match first
      let desired_results = json.results.filter(
        (movie) =>
          movie.poster_path !== null &&
          movie.title.toLowerCase() === movie_name.toLowerCase().trim(),
      );

      // If no exact match, get the first result with a poster
      if (desired_results.length === 0) {
        desired_results = json.results
          .filter((movie) => movie.poster_path !== null)
          .slice(0, 1);
      } else {
        // Only return the first exact match
        desired_results = [desired_results[0]];
      }

      return desired_results;
    } catch (error) {
      console.error("TMDB search error:", error);
      return [];
    }
  };

  return (
    <div className="relative flex items-center z-20 pt-32 md:pt-40 pb-16">
      <div className="w-full max-w-4xl mx-auto px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-white text-center mb-8">
          Search for Movies
        </h1>

        <form
          className="bg-black/60 backdrop-blur-sm p-6 md:p-8 rounded-lg border border-gray-800"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="flex flex-col md:flex-row gap-4">
            <input
              ref={searchInput}
              type="text"
              placeholder={gptSearchConstants?.[appLanguage].placeholderText}
              className="flex-1 rounded-md px-6 py-3 placeholder:text-gray-500 bg-gray-900 text-white border border-gray-700 focus:outline-none focus:border-red-700 transition"
            />
            <button
              className="px-8 py-3 bg-red-700 hover:bg-red-800 text-white font-semibold rounded-md transition transform hover:scale-105"
              onClick={searchHandler}
            >
              {gptSearchConstants?.[appLanguage].buttonText}
            </button>
          </div>

          <p className="text-sm text-gray-400 mt-4 text-center">
            Example: top hindi comedy movies, best suspense thrillers, action
            movies 2024
          </p>
        </form>
      </div>
    </div>
  );
};

export default GPTSearchBar;
