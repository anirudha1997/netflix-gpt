import React from "react";

const MovieCard = ({ posterId }) => {
  return (
    <div className="pr-3">
      <img
        src={"https://image.tmdb.org/t/p/w500" + posterId}
        className="min-w-[200px] cursor-pointer"
      />
    </div>
  );
};

export default MovieCard;
