import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { useNavigate } from "react-router-dom";
// import { onAuthStateChanged } from "firebase/auth";
// import { addUser, removeUser } from "./../utils/userSlice";
import { NETFLIX_LOGO } from "./../utils/conatants";
import { resetSearchData, toggleGPT } from "../utils/gptslice";
import { changeLanguage } from "../utils/appConfigSlice";
import { appLanguages } from "../utils/langConstants";

const Header = () => {
  const dispatch = useDispatch();
  //const navigate = useNavigate();

  const user = useSelector((store) => store.user);
  const gptSearchActive = useSelector(
    (store) => store.gptSearch.toggleGPTSearch
  );
  useEffect(() => {
    // const unsubscribe = onAuthStateChanged(auth, (user) => {
    //   if (user) {
    //     // User is signed in, see docs for a list of available properties
    //     const { uid, displayName, email, photoURL } = user;
    //     dispatch(
    //       addUser({
    //         uid: uid,
    //         displayName: displayName,
    //         email: email,
    //         photoURL: photoURL,
    //       })
    //     );
    //     navigate("/browse");
    //   } else {
    //     // User is signed out
    //     dispatch(removeUser());
    //     navigate("/");
    //   }
    // });
    // return () => {
    //   unsubscribe();
    // };
  }, []);

  const signOutHandler = () => {};

  const gptButtonHandler = () => {
    dispatch(toggleGPT());
    dispatch(resetSearchData());
  };

  const langSelectHandler = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  const dynamicHeaderClass = `absolute z-30 w-screen flex flex-col xl:flex-row items-center justify-between`;
  return (
    <div className={dynamicHeaderClass}>
      <img
        src={NETFLIX_LOGO}
        alt="netflix-logo"
        className="w-6/12 md:w-1/4 xl:w-2/12"
      />
      {user && (
        <div className="flex items-center flex-col-reverse xl:flex-row">
          <div className="flex items-center mt-4 xl:mt-0">
            {gptSearchActive && (
              <div className="relative inline-block text-gray-700">
                <select
                  className="appearance-none px-4 py-2 bg-red-800 text-white font-semibold rounded-md pr-8 mr-4 outline-none cursor-pointer"
                  onChange={langSelectHandler}
                >
                  {appLanguages.map((lang) => (
                    <option key={lang.identifier} value={lang.identifier}>
                      {lang.name}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-6 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
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
            <button
              className="px-4 py-2 bg-red-800 text-white font-semibold rounded-md"
              onClick={gptButtonHandler}
            >
              {gptSearchActive ? "Home" : "GPT Search"}
            </button>
          </div>
          <div className="flex items-center">
            <p className="text-xl font-semibold text-white mx-4 cursor-pointer">
              Hi, {user?.displayName}
            </p>
            <img src={user.photoURL} alt="profile-icon" />
            <p
              className="text-xl font-semibold text-white mx-4 cursor-pointer"
              onClick={signOutHandler}
            >
              Sign Out
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
