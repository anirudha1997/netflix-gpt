import React, { useEffect } from "react";
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from "./../utils/userSlice";
import { NETFLIX_LOGO } from "./../utils/conatants";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((store) => store.user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        const { uid, displayName, email, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            displayName: displayName,
            email: email,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const signOutHandler = () => {
    signOut(auth)
      .then(() => {
        dispatch(removeUser());
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const dynamicHeaderClass = `absolute z-20 w-screen flex items-center justify-between`;
  return (
    <div className={dynamicHeaderClass}>
      <img src={NETFLIX_LOGO} alt="netflix-logo" className="w-2/12" />
      {user && (
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
      )}
    </div>
  );
};

export default Header;
