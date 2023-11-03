import React from "react";
import useMovieVideos from "./../hooks/useMovieVideos";
import { useSelector } from "react-redux";

const MainMovieVideo = ({ movieId }) => {
  useMovieVideos(movieId);

  const videos = useSelector((store) => store.movies.mainMovieVideos);

  if (!videos) return;
  const trailers = videos.filter((video) => video.type === "Trailer");
  const video_key = trailers[0].key;

  return (
    <div className="absolute top-0 -z-10">
      <iframe
        className="w-screen aspect-video"
        src={
          "https://www.youtube.com/embed/" +
          video_key +
          "/?autoplay=1&mute=1&playlist=" +
          video_key +
          "&loop=1&controls=0"
        }
        allow="autoplay;"
      ></iframe>
    </div>
  );
};

export default MainMovieVideo;