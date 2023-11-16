import { useEffect, useCallback } from "react";
import { TMDB_options } from "../utils/conatants";
import { useDispatch } from "react-redux";
import { addGenres } from "../utils/moviesSlice";

const useGenres = () => {
  const dispatch = useDispatch();

  const fetchfn = useCallback(async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/genre/movie/list?language=en",
      TMDB_options
    );
    const json = await data.json();
    dispatch(addGenres(json?.genres));
  }, [dispatch]);

  useEffect(() => {
    fetchfn();
  }, [fetchfn]);
};

export default useGenres;
