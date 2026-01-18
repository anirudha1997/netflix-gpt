import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TMDB_options } from "../utils/conatants";
import { updateMainMovieVideo } from "../utils/moviesSlice";
import { toggleMuteStatus } from "../utils/appConfigSlice";

const HeroSection = ({ movie, showBackButton = false }) => {
  const [trailer, setTrailer] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const muteStatus = useSelector((store) => store.appConfig.muteStatus);

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const videoRes = await fetch(
          `https://api.themoviedb.org/3/movie/${movie.id}/videos`,
          TMDB_options,
        );
        const videoData = await videoRes.json();
        const trailerVideo = videoData.results?.find(
          (video) => video.type === "Trailer",
        );
        setTrailer(trailerVideo);

        const trailers = videoData.results.filter(
          (video) => video.type === "Trailer",
        );
        dispatch(updateMainMovieVideo(trailers));
      } catch (error) {
        console.error("Error fetching trailer:", error);
      }
    };

    if (movie?.id) {
      fetchTrailer();
    }
  }, [movie?.id, dispatch]);

  if (!movie) return null;

  const backdropUrl = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;

  const handleMoreInfo = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div className="relative w-full h-screen">
      {/* Video or Background Image */}
      {trailer ? (
        <iframe
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=${muteStatus ? 1 : 0}&controls=0&loop=1&playlist=${trailer.key}`}
          allow="autoplay"
          title="Movie Trailer"
        ></iframe>
      ) : (
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${backdropUrl})` }}
        />
      )}

      {/* Gradient overlays */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black via-black/50 to-transparent" />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black/80 via-transparent to-transparent" />

      {/* Controls overlay */}
      <div className="absolute bottom-16 left-0 w-full p-8 md:p-12 md:pt-0 z-10 text-white">
        <div className="max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-2xl">
            {movie.title || movie.original_title}
          </h1>

          {movie.tagline && (
            <p className="text-base md:text-xl text-gray-300 mb-4 md:mb-4 italic font-light">
              "{movie.tagline}"
            </p>
          )}

          <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
            <div className="flex items-center gap-2">
              <span className="text-green-400 text-xl md:text-2xl">⭐</span>
              <span className="text-xl md:text-2xl font-bold">
                {movie.vote_average?.toFixed(1)}
              </span>
              <span className="text-gray-400 text-base md:text-lg">/ 10</span>
            </div>
            <span className="text-gray-400">•</span>
            <span className="text-base md:text-lg font-medium">
              {movie.release_date?.split("-")[0]}
            </span>
            {movie.runtime && (
              <>
                <span className="text-gray-400">•</span>
                <span className="text-base md:text-lg font-medium">
                  {movie.runtime} min
                </span>
              </>
            )}
          </div>

          {movie.genres && movie.genres.length > 0 && (
            <div className="flex flex-wrap gap-2 md:gap-3 mb-6 md:mb-4">
              {movie.genres.slice(0, 4).map((genre) => (
                <span
                  key={genre.id}
                  className="px-3 md:px-4 py-1 md:py-2 bg-white/20 backdrop-blur-sm text-white text-xs md:text-sm font-semibold rounded-full border border-white/30"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          )}

          {movie.overview && (
            <p className="text-sm md:text-lg text-gray-300 mb-6 md:mb-8 leading-relaxed max-w-2xl line-clamp-2">
              {movie.overview}
            </p>
          )}

          <div className="flex gap-3 absolute right-20 bottom-36 md:gap-4 items-center flex-wrap">
            {showBackButton ? (
              <button
                onClick={() => navigate(-1)}
                className="px-6 md:px-8 py-2 md:py-3 bg-gray-600/80 backdrop-blur-sm text-white font-bold text-base md:text-lg rounded-md hover:bg-gray-500/80 transition shadow-lg"
              >
                ← Back
              </button>
            ) : (
              <button
                onClick={handleMoreInfo}
                className="px-6 md:px-8 py-2 md:py-3 bg-gray-600/80 backdrop-blur-sm text-white font-bold text-base md:text-lg rounded-md hover:bg-gray-500/80 transition shadow-lg"
              >
                ⓘ More Info
              </button>
            )}

            {trailer && (
              <button
                onClick={() => dispatch(toggleMuteStatus())}
                className="px-4 py-2 md:py-3 bg-gray-800/80 backdrop-blur-sm text-white rounded-md hover:bg-gray-700/80 transition shadow-lg text-xl md:text-2xl"
              >
                {muteStatus ? "🔇" : "🔊"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
