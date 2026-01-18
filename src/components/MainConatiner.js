import HeroSection from "./HeroSection";
import { useSelector } from "react-redux";

const MainContainer = () => {
  const nowPlayingMovies = useSelector(
    (store) => store.movies.nowPlayingMovies,
  );

  if (!nowPlayingMovies) return null;

  const randomIndex = Math.floor(Math.random() * nowPlayingMovies.length);
  const bannerMovie = nowPlayingMovies[randomIndex];

  const { backdrop_path } = bannerMovie;

  return (
    <div className="relative w-full h-screen">
      {/* Background Image Fallback */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${backdrop_path})`,
        }}
      />

      {/* Video */}
      <HeroSection movie={bannerMovie} showBackButton={false} />

      {/* Gradient overlays */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black/80 via-transparent to-transparent pointer-events-none" />
    </div>
  );
};

export default MainContainer;
