import React, { useRef, useState } from "react";
import Header from "./Header";
import { validateForm } from "./../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth } from "./../utils/firebase";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "./../utils/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [userType, setUserType] = useState("Old");
  const email = useRef(null);
  const password = useRef(null);
  const full_name = useRef(null);
  const [errMessage, setErrMessage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
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
  }, []);

  const formHandler = () => {
    const message = validateForm(
      email.current.value,
      password.current.value,
      full_name?.current?.value
    );

    setErrMessage(message);

    if (!message) {
      if (userType === "New") {
        createUserWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        )
          .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            console.log(user);
            updateProfile(user, {
              displayName: full_name?.current?.value,
              photoURL:
                "https://occ-0-3215-3662.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABXeeIVtmgzU089rwEnRNnxk6Q1GHEkPghoK2PHnziJv4WrrO_QxZ4crVPJIe3wjusYZjCmN1sxolKdCbQ1jli_HtH2hAzsU.png?r=fcd",
            })
              .then(() => {
                // Profile updated!
                const { uid, displayName, email, photoURL } = user;
                dispatch(
                  addUser({
                    uid: uid,
                    displayName: displayName,
                    email: email,
                    photoURL: photoURL,
                  })
                );
              })
              .catch((error) => {
                // An error occurred
                setErrMessage(error.code + ":" + error.message);
              });
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
            setErrMessage(errorCode + ":" + errorMessage);
          });
      } else {
        signInWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        )
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrMessage(errorCode + ":" + errorMessage);
          });
      }
    }
  };

  return (
    <div className="relative">
      <Header />
      <img
        src="https://assets.nflxext.com/ffe/siteui/vlv3/dace47b4-a5cb-4368-80fe-c26f3e77d540/f5b52435-458f-498f-9d1d-ccd4f1af9913/IN-en-20231023-popsignuptwoweeks-perspective_alpha_website_large.jpg"
        className="h-full min-h-screen"
        alt="background-img"
      />
      <div className="absolute top-0 left-0 bg-black opacity-60 w-full h-full"></div>
      <div
        className="absolute top-0 w-full
      flex justify-center items-center z-10 h-full"
      >
        <form
          className=" bg-black/80 p-8 flex flex-col w-4/12"
          onSubmit={(e) => e.preventDefault()}
        >
          <p className="text-3xl font-bold text-white my-4">
            {userType === "Old" ? "Sign In" : "Sign Up"}
          </p>

          {userType === "New" && (
            <input
              ref={full_name}
              type="text"
              name="full name"
              placeholder="Email your full name"
              className="text-white my-2 py-4 px-4 rounded-md bg-slate-800 placeholder:text-white"
            ></input>
          )}
          <input
            ref={email}
            type="text"
            name="email"
            placeholder="Email or phone number"
            className="text-white my-2 py-4 px-4 rounded-md bg-slate-800 placeholder:text-white"
          ></input>
          <input
            ref={password}
            type="password"
            name="password"
            placeholder="Password"
            className="text-white my-2 py-4 px-4 rounded-md bg-slate-800 placeholder:text-white"
          ></input>
          <p className="font-semibold text-red-600 my-2">{errMessage}</p>
          <button
            className="p-4 bg-red-700 rounded-md font-bold text-white my-6 text-xl"
            onClick={formHandler}
          >
            {userType === "Old" ? "Sign In" : "Sign Up"}
          </button>
          <p
            className="text-white text-xl cursor-pointer"
            onClick={() => {
              setUserType(userType === "Old" ? "New" : "Old");
            }}
          >
            {userType === "Old" ? "New to Netflix? " : "Already registered? "}

            <span className="font-semibold">
              {userType === "Old" ? "Sign up Now." : "Sign In."}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
