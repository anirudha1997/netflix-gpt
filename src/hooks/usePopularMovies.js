import { useEffect } from "react";
import { TMDB_options } from "../utils/conatants";
import { useDispatch, useSelector } from "react-redux";
import { addPopularMovies } from "../utils/moviesSlice";

const usePopularMovies = () => {
  const dispatch = useDispatch();
  const popoularMoviesInStore = useSelector(
    (store) => store.movies.popularMovies
  );

  useEffect(() => {
    if (!popoularMoviesInStore) popularMovies();
  });

  const popularMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/popular?page=1",
      TMDB_options
    );
    const json = await data.json();
    dispatch(addPopularMovies(json.results));
  };
};

export default usePopularMovies;
