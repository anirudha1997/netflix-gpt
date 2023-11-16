import { useState } from "react";
import MovieCard from "./MovieCard";

const MoviesList = ({ title, moviesData }) => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const handleMouseEnter = (index) => {
    setHoveredCard(index);
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
  };
  return (
    <div className="py-6 xl:py-4">
      <h1 className="text-2xl font-semibold text-white mb-3">{title}</h1>
      <div className="flex overflow-x-scroll overflow-y-hidden">
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
