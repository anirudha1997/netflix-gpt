import React from "react";
import { gptSearchConstants } from "../utils/langConstants";
import { useSelector } from "react-redux";

const GPTSearchBar = () => {
  const appLanguage = useSelector((store) => store.appConfig.lang);

  return (
    <div className="absolute top-0 w-screen h-screen flex justify-center pt-[20%] z-20">
      <form className="bg-black/90 py-10 rounded-md w-8/12 flex justify-center items-center h-max">
        <input
          type="text"
          placeholder={gptSearchConstants?.[appLanguage].placeholderText}
          className="rounded-md px-4 py-2 mr-6 placeholder:text-gray-600 w-2/3"
        ></input>
        <button className="text-xl px-4 py-1 bg-red-800 text-white font-semibold rounded-md">
          {gptSearchConstants?.[appLanguage].buttonText}
        </button>
      </form>
    </div>
  );
};

export default GPTSearchBar;
