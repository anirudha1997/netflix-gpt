import React from "react";

const MainMovieInfo = ({ title, description }) => {
  return (
    <div className="w-screen bg-gradient-to-r from-black to-black xl:to-transparent aspect-video pt-[70%] md:pt-[60%] md:pb-[5%] xl:pt-[25%] pl-10 z-10">
      <div className="w-8/12 relative z-20 xl:w-5/12">
        <h1 className="text:2xl xl:text-5xl font-bold text-white mb-3">
          {title}
        </h1>
        <p className="text-xl text-white mb-3 hidden xl:block">{description}</p>
        <div className="flex items-center mt-5">
          <button className="px-4 py-2 bg-white font-semibold rounded-sm cursor-pointer xl:text-xl">
            ▶️ Play
          </button>
          <button className="ml-3 px-4 py-2 bg-gray-600 text-white font-semibold rounded-sm cursor-pointer xl:text-xl">
            ⓘ More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainMovieInfo;
