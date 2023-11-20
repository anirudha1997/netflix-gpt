import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import play_button from "../assets/images/play-button.png";

const MovieCard = ({
  posterId,
  adult,
  rating,
  onMouseEnter,
  onMouseLeave,
  isHovered,
  genre_ids,
  cardIndex,
}) => {
  const genres = useSelector((store) => store.movies.genres);
  const trailer = useSelector((store) => store.movies.movieTrailer);
  const show_video = useSelector((store) => store.movies.showIframe);

  const genreNames = useMemo(() => {
    const names = [];
    if (genres) {
      genre_ids.forEach((genre) => {
        genres.forEach((storedGenre) => {
          if (storedGenre && storedGenre.id === genre)
            names.push(storedGenre.name);
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

  const trailor_video_key = trailer?.key;

  return (
    <div
      id={`movieCard-${posterId}-${cardIndex}`}
      className={
        "min-w-[185px] mr-3 relative hover:scale-x-150 hover:scale-y-125 cursor-pointer " +
        (cardIndex === 0 ? "origin-left" : "")
      }
      style={{ zIndex: isHovered ? 1 : 0 }}
    >
      {isHovered && (
        <iframe
          className={`w-full pointer-events-none h-[55%] ${
            !show_video ? "hidden" : ""
          }`}
          src={
            "https://www.youtube.com/embed/" +
            trailor_video_key +
            "/?autoplay=1&mute=1&playlist=" +
            trailor_video_key +
            "&loop=1&controls=0"
          }
          allow="autoplay;"
          title="Video Player"
        ></iframe>
      )}
      <img
        src={"https://image.tmdb.org/t/p/w185" + posterId}
        className={"w-full h-auto " + (show_video && isHovered ? "hidden" : "")}
        alt="movie poster"
      />
      {isHovered && (
        <div className="absolute bottom-5 left-0 w-full flex h-[45%]">
          <div className="bg-gray-900 opacity-95 text-white font-semibold w-full py-4">
            <div className="flex items-center justify-between">
              <button className="ml-2 scale-x-[0.67] scale-y-[0.8]">
                <img src={play_button} alt="play" />
              </button>
              <p className="scale-x-[0.67] scale-y-[0.8] mr-4 border border-gray-500 p-1 text-gray-500 font-semibold w-fit">
                {adult ? "A" : "U/A"}
              </p>
            </div>
            <p className="scale-x-[0.67] scale-y-[0.8] -ml-5 pb-0">
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
