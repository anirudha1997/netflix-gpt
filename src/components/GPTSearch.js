import React from "react";
import GPTSearchBar from "./GPTSearchBar";
import GPTSuggestions from "./GPTSuggestions";
import { BG_IMG } from "./../utils/conatants";

const GPTSearch = () => {
  return (
    <div className="relative">
      <img src={BG_IMG} />
      <div
        className="absolute top-0 w-full
      flex justify-center items-center z-10 h-full bg-black/60"
      ></div>
      <GPTSearchBar />
      <GPTSuggestions />
    </div>
  );
};

export default GPTSearch;
