import React from "react";
import GPTSearchBar from "./GPTSearchBar";
import GPTSuggestions from "./GPTSuggestions";
import { BG_IMG } from "./../utils/conatants";

const GPTSearch = () => {
  return (
    <div className="relative min-h-screen bg-black">
      {/* Background Image with Overlay */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${BG_IMG}')` }}
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <GPTSearchBar />
        <GPTSuggestions />
      </div>
    </div>
  );
};

export default GPTSearch;
