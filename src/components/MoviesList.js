import { useState, useRef } from "react";
import MovieCard from "./MovieCard";
// ...existing code...
// Removed unused imports and variables

const MoviesList = ({ title, moviesData, type }) => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const containerRef = useRef(null);
  // Removed unused dispatch variable

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -800, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 800, behavior: "smooth" });
    }
  };

  const handleMouseEnter = (index) => {
    setHoveredCard(index);
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
  };

  return (
    <div className="relative group/list mb-8">
      {/* Title */}
      {title && (
        <h2 className="text-xl md:text-2xl font-bold text-white mb-4 px-4 md:px-0">
          {title}
        </h2>
      )}

      {/* Left Arrow */}
      {showLeftArrow && (
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-40 w-12 h-full bg-black/80 hover:bg-black/90 flex items-center justify-center opacity-0 group-hover/list:opacity-100 transition-opacity duration-300"
          aria-label="Scroll left"
        >
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      )}

      {/* Movies Container */}
      <div
        className="flex gap-4 overflow-x-scroll overflow-y-visible scroll-smooth hide-scrollbar px-4 md:px-0"
        ref={containerRef}
        onScroll={handleScroll}
      >
        {moviesData?.map((movie, index) => (
          <div key={movie.id} className="w-[150px] md:w-[180px] flex-shrink-0">
            <MovieCard
              relatedTitle={title}
              movieId={movie.id}
              posterId={movie.poster_path}
              adult={movie.adult}
              title={movie.title}
              rating={movie.vote_average}
              genre_ids={movie.genre_ids}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              isHovered={hoveredCard === index}
              cardIndex={index}
              cardType={type}
            />
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      {showRightArrow && (
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-40 w-12 h-full bg-black/80 hover:bg-black/90 flex items-center justify-center opacity-0 group-hover/list:opacity-100 transition-opacity duration-300"
          aria-label="Scroll right"
        >
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      )}

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default MoviesList;
