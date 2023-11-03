import { useEffect } from "react";
import { TMDB_options } from "../utils/conatants";
import { useDispatch } from "react-redux";
import { mainMovieVideo } from "../utils/moviesSlice";

const useMovieVideos = (movieID) => {
  const dispatch = useDispatch();

  useEffect(() => {
    moviesVideos();
  }, []);

  const moviesVideos = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" + movieID + "/videos",
      TMDB_options
    );
    const json = await data.json();
    dispatch(mainMovieVideo(json.results));
  };
};

export default useMovieVideos;