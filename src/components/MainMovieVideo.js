import React from "react";
import useMovieVideos from "./../hooks/useMovieVideos";
import { useSelector } from "react-redux";

const MainMovieVideo = ({ movieId }) => {
  useMovieVideos(movieId);

  const videos = useSelector((store) => store.movies.mainMovieVideos);
  const muteStatus = useSelector((store) => store.appConfig.muteStatus);

  if (!videos) return;
  const trailers = videos.filter((video) => video.type === "Trailer");
  const video_key = trailers[0].key;

  return (
    <div className="absolute top-44 xl:top-0 z-0 pointer-events-none">
      <iframe
        className="w-screen aspect-video"
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
