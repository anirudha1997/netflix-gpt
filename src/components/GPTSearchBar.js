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
    dispatch(setLoadingState(true));
    const gptQuery =
      "Act as a movie recommendation system for this query :" +
      searchInput.current.value +
      ".Give me the result as 5 movie names which are comma separated like the example result given ahead. Do not give result in any other format. Example: Dhamaal,Don,Baadshah,Kuch Kuch Hota Hai,Taare Zameen Par";
    const data = await openai.chat.completions.create({
      messages: [{ role: "user", content: gptQuery }],
      model: "gpt-3.5-turbo",
    });
    const results = data.choices[0].message.content;
    const movieTitles = results.split(",");
    const promiseArray = movieTitles.map((movie) => searchInTMDB(movie));
    const movieResults = await Promise.all(promiseArray);
    dispatch(addSearchMovieResults({ movieTitles, movieResults }));
    dispatch(setLoadingState(false));
  };

  const searchInTMDB = async (movie_name) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie_name +
        "&include_adult=false&page=1",
      TMDB_options
    );
    const json = await data.json();
    let desired_results = json.results.filter(
      (movie) =>
        movie.poster_path !== null &&
        movie.title.toLowerCase() === movie_name.toLowerCase()
    );
    if (desired_results.length === 0)
      desired_results = json.results.filter(
        (movie) => movie.poster_path !== null
      );
    return desired_results;
  };

  return (
    <div className="relative flex items-center z-20 pt-[50%] xl:pt-[15%] xl:pb-[25%] flex-col ">
      <form
        className="bg-none xl:bg-black py-10 rounded-md flex justify-center items-center h-max flex-col w-10/12 xl:flex-row xl:w-8/12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchInput}
          type="text"
          placeholder={gptSearchConstants?.[appLanguage].placeholderText}
          className="rounded-md px-4 py-2  placeholder:text-gray-600 w-full mr-0 xl:w-2/3 xl:mr-6"
        ></input>
        <button
          className="text-xl px-4 py-1 bg-red-800 text-white font-semibold rounded-md mt-4 xl:mt-0"
          onClick={searchHandler}
        >
          {gptSearchConstants?.[appLanguage].buttonText}
        </button>
      </form>
      <p className="text-xl text-red-700">
        Example: top hindi comedy movies, best movies which have suspense ...
      </p>
    </div>
  );
};

export default GPTSearchBar;
