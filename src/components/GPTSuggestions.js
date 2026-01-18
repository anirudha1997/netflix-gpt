import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const GPTSuggestions = () => {
  const { searchMovieTitles, searchMovieResults, loadingState } = useSelector(
    (store) => store.gptSearch,
  );
  const navigate = useNavigate();

  if (loadingState) {
    return (
      <div className="relative z-40 flex justify-center items-center py-20">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-red-700 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xl text-white font-semibold">
            Searching for movies...
          </p>
        </div>
      </div>
    );
  }

  if (
    !searchMovieTitles ||
    !searchMovieResults ||
    searchMovieTitles.length === 0
  ) {
    return null;
  }

  return (
    <div className="relative z-40 px-4 md:px-8 lg:px-12 pb-12">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
          Recommended for You
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {searchMovieTitles.map((movieTitle, index) => {
            const movie = searchMovieResults[index]?.[0];

            if (!movie || !movie.poster_path) return null;

            return (
              <div
                key={movie.id}
                onClick={() => navigate(`/movie/${movie.id}`)}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-gray-900 shadow-lg transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Movie info on hover */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-white font-bold text-sm md:text-base line-clamp-2 mb-2">
                      {movie.title}
                    </h3>

                    <div className="flex items-center gap-2 text-xs md:text-sm">
                      <span className="text-green-400 font-semibold">
                        ⭐ {movie.vote_average?.toFixed(1)}
                      </span>
                      {movie.release_date && (
                        <>
                          <span className="text-gray-400">•</span>
                          <span className="text-gray-300">
                            {movie.release_date.split("-")[0]}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Play button on hover */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-white/90 rounded-full flex items-center justify-center">
                      <span className="text-black text-xl md:text-2xl ml-1">
                        ▶
                      </span>
                    </div>
                  </div>
                </div>

                {/* Movie title below poster */}
                <div className="mt-3">
                  <h3 className="text-white font-semibold text-sm md:text-base line-clamp-2">
                    {movie.title}
                  </h3>
                  <p className="text-gray-400 text-xs md:text-sm mt-1">
                    {movie.release_date?.split("-")[0] || "N/A"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GPTSuggestions;
