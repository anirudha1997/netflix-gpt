import React from "react";
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((store) => store.user);

  const signOutHandler = () => {
    signOut(auth)
      .then(() => {
        dispatch(removeUser());
        navigate("/");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const dynamicHeaderClass = `absolute z-10 w-screen flex items-center justify-between ${
    user ? "bg-black/60" : ""
  }`;
  return (
    <div className={dynamicHeaderClass}>
      <img
        src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
        alt="netflix-logo"
        className="w-2/12"
      />
      {user && (
        <div className="flex items-center">
          <p className="text-xl font-semibold text-white mx-4 cursor-pointer">
            Hi, {user?.displayName}
          </p>
          <img
            src="https://occ-0-3215-3662.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABXeeIVtmgzU089rwEnRNnxk6Q1GHEkPghoK2PHnziJv4WrrO_QxZ4crVPJIe3wjusYZjCmN1sxolKdCbQ1jli_HtH2hAzsU.png?r=fcd"
            alt="profile-icon"
          />
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
