import { useEffect } from "react";
import { TMDB_options } from "../utils/conatants";
import { useDispatch, useSelector } from "react-redux";
import { addUpcomingMovies } from "../utils/moviesSlice";

const useUpcomingMovies = () => {
  const dispatch = useDispatch();
  const upcomingMoviesInStore = useSelector(
    (store) => store.movies.upcomingMovies
  );

  useEffect(() => {
    if (!upcomingMoviesInStore) upcomingMovies();
  });

  const upcomingMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/upcoming?page=1",
      TMDB_options
    );
    const json = await data.json();
    dispatch(addUpcomingMovies(json.results));
  };
};

export default useUpcomingMovies;
