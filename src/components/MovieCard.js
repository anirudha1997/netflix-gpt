import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const MovieCard = ({
  posterId,
  relatedTitle,
  adult,
  rating,
  title,
  onMouseEnter,
  onMouseLeave,
  isHovered,
  genre_ids,
  cardIndex,
  cardType,
  movieId,
}) => {
  const genres = useSelector((store) => store.movies.genres);
  const navigate = useNavigate();

  const genreNames = useMemo(() => {
    const names = [];
    if (genres && genre_ids) {
      genre_ids.forEach((genre) => {
        genres.forEach((storedGenre) => {
          if (storedGenre && storedGenre.id === genre)
            names.push(storedGenre.name);
        });
      });
    }
    return names;
  }, [genre_ids, genres]);

  const handleCardClick = () => {
    navigate(`/movie/${movieId}`);
  };

  // Consistent card design for all types
  return (
    <div
      onClick={handleCardClick}
      className="group cursor-pointer flex-shrink-0"
    >
      <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-gray-900 shadow-lg transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl">
        <img
          src={`https://image.tmdb.org/t/p/w500${posterId}`}
          alt={title}
          className="w-full h-full object-cover"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Movie info on hover */}
        <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="text-white font-bold text-xs md:text-sm line-clamp-2 mb-2 leading-tight pr-2">
            {title}
          </h3>

          <div className="flex items-center gap-2 text-xs md:text-sm mb-2">
            <span className="text-green-400 font-semibold">
              ⭐ {rating?.toFixed(1)}
            </span>
            {adult !== undefined && (
              <>
                <span className="text-gray-400">•</span>
                <span className="px-1.5 py-0.5 border border-gray-500 text-gray-300 text-xs font-semibold">
                  {adult ? "18+" : "PG-13"}
                </span>
              </>
            )}
          </div>

          {/* Genres */}
          {genreNames.length > 0 && (
            <p className="text-gray-400 text-xs line-clamp-1">
              {genreNames.slice(0, 2).join(" • ")}
            </p>
          )}
        </div>

        {/* Play button on hover */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-12 h-12 md:w-8 md:h-8 bg-white/90 rounded-full flex items-center justify-center">
            <span className="text-black text-lg ml-1">▶</span>
          </div>
        </div>
      </div>

      {/* Movie title below poster */}
      <div className="mt-2">
        <h3 className="text-white font-semibold text-sm line-clamp-2">
          {title}
        </h3>
      </div>
    </div>
  );
};

export default MovieCard;
