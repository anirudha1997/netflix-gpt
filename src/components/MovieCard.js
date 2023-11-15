import React from "react";

const MovieCard = ({ posterId }) => {
  return (
    <div className="pr-3">
      <img
        src={"https://image.tmdb.org/t/p/w185" + posterId}
        className="min-w-[185px] cursor-pointer"
        alt="movie poster"
      />
    </div>
  );
};

export default MovieCard;
