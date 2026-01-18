import { useState, useRef } from "react";

const CastList = ({ title, castData }) => {
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const containerRef = useRef(null);

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

  if (!castData || castData.length === 0) return null;

  return (
    <div className="relative group/list mb-8">
      {/* Title */}
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 px-4 md:px-0">
        {title}
      </h2>

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

      {/* Cast Container */}
      <div
        className="flex gap-4 overflow-x-scroll overflow-y-visible scroll-smooth hide-scrollbar px-4 md:px-0"
        ref={containerRef}
        onScroll={handleScroll}
      >
        {castData.map((actor) => (
          <div
            key={actor.id}
            className="w-[140px] md:w-[160px] flex-shrink-0 group cursor-pointer"
          >
            <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-gray-900 shadow-lg transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl mb-3">
              {actor.profile_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                  alt={actor.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-600">
                  <span className="text-5xl">👤</span>
                </div>
              )}

              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Info on hover */}
              <div className="absolute bottom-0 left-0 right-0 p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-white font-bold text-xs md:text-sm line-clamp-1">
                  {actor.name}
                </p>
                <p className="text-gray-300 text-xs line-clamp-1 mt-1">
                  {actor.character}
                </p>
              </div>
            </div>

            {/* Actor info below */}
            <div>
              <p className="font-semibold text-sm line-clamp-1 text-white">
                {actor.name}
              </p>
              <p className="text-gray-400 text-xs line-clamp-1">
                {actor.character}
              </p>
            </div>
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

export default CastList;
