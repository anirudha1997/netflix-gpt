import React, { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TMDB_options } from "../utils/conatants";
import { updateMainMovieVideo } from "../utils/moviesSlice";

const MainMovieVideo = ({ movieId }) => {
  const dispatch = useDispatch();
  const trailer_video = useSelector((store) => store.movies.mainMovieVideos);
  const muteStatus = useSelector((store) => store.appConfig.muteStatus);

  const fetchMainMovieVideo = useCallback(async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" + movieId + "/videos",
      TMDB_options
    );
    const json = await data.json();
    const trailer = json.results.filter((video) => video.type === "Trailer");
    dispatch(updateMainMovieVideo(trailer));
  }, [dispatch, movieId]);

  useEffect(() => {
    fetchMainMovieVideo();
  }, [fetchMainMovieVideo]);

  if (!trailer_video) return;
  const video_key = trailer_video[0].key;

  return (
    <div className="absolute top-44 xl:top-0 z-0 pointer-events-none w-full">
      <iframe
        className="w-full aspect-video"
        src={
          "https://www.youtube.com/embed/" +
          video_key +
          "/?autoplay=1" +
          (muteStatus ? "&mute=1" : "&mute=0") +
          "&playlist=" +
          video_key +
          "&loop=1&controls=0"
        }
        allow="autoplay;"
        title="Video Player"
      ></iframe>
    </div>
  );
};

export default MainMovieVideo;
