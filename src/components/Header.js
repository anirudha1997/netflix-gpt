import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { auth } from "../utils/conatants";
import { addUser, removeUser } from "./../utils/userSlice";
import { NETFLIX_LOGO } from "./../utils/conatants";
import { resetSearchData, toggleGPT } from "../utils/gptslice";
import { changeLanguage } from "../utils/appConfigSlice";
import { appLanguages } from "../utils/langConstants";
import useGenres from "../hooks/useGenres";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const user = useSelector((store) => store.user);
  const gptSearchActive = useSelector(
    (store) => store.gptSearch.toggleGPTSearch,
  );

  const currentUser = auth.currentUser();
  useGenres();

  // Check if we're on the movie landing page
  const isMoviePage = location.pathname.startsWith("/movie/");

  useEffect(() => {
    if (currentUser) {
      // User is logged in
      const { full_name, avatar_url } = currentUser.user_metadata;
      dispatch(
        addUser({
          displayName: full_name.split(" ")[0],
          photoURL: avatar_url,
        }),
      );
      // Only navigate to /browse if we're on the login page
      if (location.pathname === "/") {
        navigate("/browse");
      }
    } else {
      // User is signed out
      dispatch(removeUser());
      navigate("/");
    }
  }, [dispatch, navigate, currentUser]);

  const signOutHandler = async () => {
    try {
      await currentUser.logout();
      dispatch(removeUser());
      navigate("/");
    } catch (error) {
      alert("Failed to logout user: %o", error);
    }
  };

  const gptButtonHandler = () => {
    dispatch(toggleGPT());
    dispatch(resetSearchData());
    if (!gptSearchActive) {
      navigate("/browse");
    } else {
      navigate("/browse");
    }
  };

  const homeButtonHandler = () => {
    // If GPT search is active, toggle it off
    if (gptSearchActive) {
      dispatch(toggleGPT());
      dispatch(resetSearchData());
    }
    navigate("/browse");
  };

  const langSelectHandler = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className="absolute z-30 w-full flex flex-col xl:flex-row items-center justify-between px-4 md:px-8 py-4">
      <img
        src={NETFLIX_LOGO}
        alt="netflix-logo"
        className="w-32 md:w-40 cursor-pointer"
        onClick={homeButtonHandler}
      />
      {user && (
        <div className="flex items-center flex-col-reverse xl:flex-row gap-4">
          <div className="flex items-center gap-3">
            {/* Show language selector only in GPT Search */}
            {gptSearchActive && (
              <div className="relative inline-block text-gray-700">
                <select
                  className="appearance-none px-4 py-2 bg-red-700 hover:bg-red-800 text-white font-semibold rounded-md pr-8 outline-none cursor-pointer transition"
                  onChange={langSelectHandler}
                >
                  {appLanguages.map((lang) => (
                    <option key={lang.identifier} value={lang.identifier}>
                      {lang.name}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </div>
              </div>
            )}

            {/* Show Home button on movie pages, GPT Search button on browse page */}
            {isMoviePage ? (
              <button
                className="px-4 py-2 bg-red-700 hover:bg-red-800 text-white font-semibold rounded-md transition"
                onClick={homeButtonHandler}
              >
                🏠 Home
              </button>
            ) : (
              <button
                className="px-4 py-2 bg-red-700 hover:bg-red-800 text-white font-semibold rounded-md transition"
                onClick={gptButtonHandler}
              >
                {gptSearchActive ? "🏠 Home" : "🔍 GPT Search"}
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <p className="text-base md:text-lg font-semibold text-white">
              Hi, {user?.displayName}
            </p>
            <img
              src={user.photoURL}
              alt="profile-icon"
              className="h-8 w-8 rounded-full object-cover border-2 border-white/20"
            />
            <button
              className="text-base md:text-lg font-semibold text-white hover:text-gray-300 transition"
              onClick={signOutHandler}
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
