import { useEffect, useMemo } from "react";
import useGenres from "../hooks/useGenres";
import { useSelector } from "react-redux";

const MovieCard = ({
  posterId,
  title,
  rating,
  onMouseEnter,
  onMouseLeave,
  isHovered,
  genre_ids,
  cardIndex,
}) => {
  useGenres();
  const genres = useSelector((store) => store.movies.genres);
  const genreNames = useMemo(() => {
    const names = [];
    if (genres) {
      genre_ids.forEach((genre) => {
        genres.forEach((storedGenre) => {
          if (storedGenre.id === genre) names.push(storedGenre.name);
        });
      });
    }
    return names;
  }, [genre_ids, genres]);
  useEffect(() => {
    const card = document.getElementById(`movieCard-${posterId}-${cardIndex}`);

    if (card) {
      card.addEventListener("mouseenter", onMouseEnter);
      card.addEventListener("mouseleave", onMouseLeave);

      return () => {
        card.removeEventListener("mouseenter", onMouseEnter);
        card.removeEventListener("mouseleave", onMouseLeave);
      };
    }
  }, [posterId, cardIndex, onMouseEnter, onMouseLeave]);
  return (
    <div
      id={`movieCard-${posterId}-${cardIndex}`}
      className={
        "min-w-[185px] mr-3 relative hover:scale-x-150 hover:scale-y-125 cursor-pointer " +
        (cardIndex === 0 ? "origin-left" : "")
      }
      style={{ zIndex: isHovered ? 1 : 0 }}
    >
      <img
        src={"https://image.tmdb.org/t/p/w185" + posterId}
        className=" w-full h-auto"
        alt="movie poster"
      />
      {isHovered && (
        <div className="absolute bottom-5 left-0 w-full flex">
          <div className="bg-gray-900 opacity-95 text-white font-semibold w-full py-4">
            <p className="scale-x-[0.67] scale-y-[0.8] p-0 -ml-5">{title}</p>
            <p className="scale-x-[0.67] scale-y-[0.8] -ml-5">
              Rating: {rating.toFixed(1) !== "0.0" ? rating.toFixed(1) : "N/A"}
            </p>
            <p className="scale-x-[0.67] scale-y-[0.8] text-sm -ml-5">
              {genreNames.join(" · ")}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieCard;
