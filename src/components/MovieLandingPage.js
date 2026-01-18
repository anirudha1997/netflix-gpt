import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TMDB_options } from "../utils/conatants";
import Header from "./Header";
import HeroSection from "./HeroSection";
import CastList from "./CastList";
import MoviesList from "./MoviesList";

const MovieLandingPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchMovieData = async () => {
      try {
        // Fetch movie details
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}`,
          TMDB_options,
        );
        const data = await res.json();
        setMovie(data);

        // Fetch cast
        const creditsRes = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/credits`,
          TMDB_options,
        );
        const creditsData = await creditsRes.json();
        setCast(creditsData.cast?.slice(0, 10) || []);

        // Fetch similar movies
        const similarRes = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/similar`,
          TMDB_options,
        );
        const similarData = await similarRes.json();
        setSimilar(similarData.results?.slice(0, 12) || []);
      } catch (error) {
        console.error("Error fetching movie data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieData();
  }, [movieId]);

  if (loading) {
    return (
      <div className="bg-black min-h-screen">
        <Header />
        <div className="flex flex-col justify-center items-center h-screen gap-4">
          <div className="w-16 h-16 border-4 border-red-700 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-white text-xl">Loading movie details...</p>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="bg-black min-h-screen">
        <Header />
        <div className="flex justify-center items-center h-96">
          <div className="text-center">
            <p className="text-white text-2xl mb-4">Movie not found</p>
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-2 bg-red-700 text-white rounded-md hover:bg-red-800 transition"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white">
      <Header />

      {/* Hero Section with Trailer */}
      <HeroSection movie={movie} showBackButton={true} />

      {/* Content Section */}
      <div className="relative bg-black px-6 md:px-12 pb-12 -mt-14">
        <div className="max-w-8bg-black relative z-20 pt-12xl mx-auto">
          {/* Overview Section */}
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Overview</h2>
            <p className="text-gray-300 text-lg leading-relaxed max-w-5xl">
              {movie.overview}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 hover:border-gray-700 transition">
              <p className="text-gray-400 text-sm mb-2">Budget</p>
              <p className="text-white text-3xl font-bold">
                {movie.budget
                  ? `$${(movie.budget / 1000000).toFixed(0)}M`
                  : "N/A"}
              </p>
            </div>
            <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 hover:border-gray-700 transition">
              <p className="text-gray-400 text-sm mb-2">Revenue</p>
              <p className="text-white text-3xl font-bold">
                {movie.revenue
                  ? `$${(movie.revenue / 1000000).toFixed(0)}M`
                  : "N/A"}
              </p>
            </div>
            <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 hover:border-gray-700 transition">
              <p className="text-gray-400 text-sm mb-2">Vote Count</p>
              <p className="text-white text-3xl font-bold">
                {movie.vote_count?.toLocaleString()}
              </p>
            </div>
            <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 hover:border-gray-700 transition">
              <p className="text-gray-400 text-sm mb-2">Popularity</p>
              <p className="text-white text-3xl font-bold">
                {movie.popularity?.toFixed(0)}
              </p>
            </div>
          </div>

          {/* Production Info */}
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Production</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {movie.production_companies &&
                movie.production_companies.length > 0 && (
                  <div>
                    <h3 className="text-gray-400 text-sm mb-4">
                      Production Companies
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {movie.production_companies.map((company) => (
                        <span
                          key={company.id}
                          className="px-4 py-2 bg-gray-900/50 text-white rounded-lg border border-gray-800 hover:border-gray-700 transition"
                        >
                          {company.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              {movie.production_countries &&
                movie.production_countries.length > 0 && (
                  <div>
                    <h3 className="text-gray-400 text-sm mb-4">Countries</h3>
                    <div className="flex flex-wrap gap-3">
                      {movie.production_countries.map((country) => (
                        <span
                          key={country.iso_3166_1}
                          className="px-4 py-2 bg-gray-900/50 text-white rounded-lg border border-gray-800 hover:border-gray-700 transition"
                        >
                          {country.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
            </div>
          </div>

          {/* Cast Section */}
          <CastList title="Top Cast" castData={cast} />

          {/* Similar Movies */}
          {similar.length > 0 && (
            <div>
              <MoviesList
                title="More Like This"
                moviesData={similar}
                type="similar"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieLandingPage;
