import { useEffect } from "react";
import { TMDB_options } from "../utils/conatants";
import { useDispatch, useSelector } from "react-redux";
import { addMovieVideos } from "../utils/moviesSlice";

const useMovieTrailer = (movieID) => {
  const dispatch = useDispatch();
  const movieVideosInStore = useSelector((store) => store.movieTrailer);

  useEffect(() => {
    if (!movieVideosInStore) moviesVideos();
  });

  const moviesVideos = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" + movieID + "/videos",
      TMDB_options
    );
    const json = await data.json();
    const trailer = json.results.filter((video) => video.type === "Trailer");
    console.log("hook executed");
    dispatch(addMovieVideos(trailer));
  };
};

export default useMovieTrailer;
