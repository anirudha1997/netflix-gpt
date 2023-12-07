import { useState, useRef } from "react";
import MovieCard from "./MovieCard";
import leftArrow from "../assets/images/left-arrow.png";
import { TMDB_options } from "../utils/conatants";
import { useDispatch } from "react-redux";
import {
  addMovieVideos,
  clearMovieVideos,
  setShowIframe,
} from "../utils/moviesSlice";

const MoviesList = ({ title, moviesData, type }) => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const containerRef = useRef(null);
  const dispatch = useDispatch();

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft -= 400;
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += 400;
    }
  };

  const fetchTrailerVideo = async (movieID) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" + movieID + "/videos",
      TMDB_options
    );
    const json = await data.json();
    const trailer = json.results.filter((video) => video.type === "Trailer");
    console.log("hook executed");
    dispatch(addMovieVideos(trailer[0]));
  };

  let timer;

  const handleMouseEnter = (index, movieId) => {
    if (type !== "suggestions") {
      fetchTrailerVideo(movieId);
      timer = setTimeout(() => {
        dispatch(setShowIframe(true));
      }, 900);
    }
    setHoveredCard(index);
  };

  const handleMouseLeave = () => {
    if (type !== "suggestions") {
      dispatch(setShowIframe(false));
      clearTimeout(timer);
      dispatch(clearMovieVideos());
    }
    setHoveredCard(null);
  };

  return (
    <div className="py-6 xl:py-5">
      <div className="flex items-center">
        <h1 className="text-xl md:text-2xl font-semibold text-white mb-3">
          {title}
        </h1>
        {moviesData.length > 7 && (
          <>
            <button className="mx-4 mb-2" onClick={scrollLeft}>
              <img src={leftArrow} alt="scroll left" className="h-6" />
            </button>
            <button className="mb-2" onClick={scrollRight}>
              <img
                src={leftArrow}
                className="rotate-180 h-6"
                alt="scroll right"
              />
            </button>
          </>
        )}
      </div>
      <div
        className="flex overflow-x-scroll overflow-y-hidden scroll-smooth"
        ref={containerRef}
      >
        {moviesData?.map((movie, index) => (
          <MovieCard
            key={movie.id}
            relatedTitle={title}
            movieId={movie.id}
            posterId={movie.poster_path}
            adult={movie.adult}
            title={movie.title}
            rating={movie.vote_average}
            genre_ids={movie.genre_ids}
            onMouseEnter={() => handleMouseEnter(index, movie.id)}
            onMouseLeave={handleMouseLeave}
            isHovered={hoveredCard === index}
            cardIndex={index}
          />
        ))}
      </div>
    </div>
  );
};

export default MoviesList;
