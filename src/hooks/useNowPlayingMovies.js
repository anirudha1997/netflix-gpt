import { useEffect } from "react";
import { TMDB_options } from "../utils/conatants";
import { useDispatch, useSelector } from "react-redux";
import { addNowPlayingMovies } from "../utils/moviesSlice";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();
  const moviesInStore = useSelector((store) => store.nowPlayingMovies);

  useEffect(() => {
    if (!moviesInStore) nowPlayingMovies();
  }, []);

  const nowPlayingMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?page=1",
      TMDB_options
    );
    const json = await data.json();
    dispatch(addNowPlayingMovies(json.results));
  };
};

export default useNowPlayingMovies;
