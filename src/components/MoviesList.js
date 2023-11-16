import { useState, useRef } from "react";
import MovieCard from "./MovieCard";
import leftArrow from "../assets/images/left-arrow.png";

const MoviesList = ({ title, moviesData }) => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const containerRef = useRef(null);

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

  const handleMouseEnter = (index) => {
    setHoveredCard(index);
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
  };

  return (
    <div className="py-6 xl:py-4">
      <div className="flex items-center">
        <h1 className="text-2xl font-semibold text-white mb-3">{title}</h1>
        <button className="mx-4 mb-2" onClick={scrollLeft}>
          <img src={leftArrow} alt="scroll left" className="h-6" />
        </button>
        <button className="mb-2" onClick={scrollRight}>
          <img src={leftArrow} className="rotate-180 h-6" alt="scroll right" />
        </button>
      </div>
      <div
        className="flex overflow-x-scroll overflow-y-hidden scroll-smooth"
        ref={containerRef}
      >
        {moviesData?.map((movie, index) => (
          <MovieCard
            key={movie.id}
            posterId={movie.poster_path}
            title={movie.title}
            rating={movie.vote_average}
            genre_ids={movie.genre_ids}
            onMouseEnter={() => handleMouseEnter(index)}
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
