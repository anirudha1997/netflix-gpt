import React from "react";
import GPTSearchBar from "./GPTSearchBar";
import GPTSuggestions from "./GPTSuggestions";
import { BG_IMG } from "./../utils/conatants";

const GPTSearch = () => {
  const conatinerStyle = {
    backgroundImage: "url( '" + BG_IMG + "')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };
  return (
    <div className="relative bg-black" style={conatinerStyle}>
      <div
        className="absolute top-0 w-full
      flex justify-center items-center z-10 h-full bg-black/80"
      ></div>
      <GPTSearchBar />
      <GPTSuggestions />
    </div>
  );
};

export default GPTSearch;
