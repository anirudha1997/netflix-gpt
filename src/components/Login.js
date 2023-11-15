import React, { useRef, useState } from "react";
import Header from "./Header";
import { validateForm } from "./../utils/validate";
import { useDispatch } from "react-redux";
import { addUser } from "./../utils/userSlice";
import { AVATAR_IMG, BG_IMG } from "./../utils/conatants";

const Login = () => {
  const [userType, setUserType] = useState("Old");
  const email = useRef(null);
  const password = useRef(null);
  const full_name = useRef(null);
  const [errMessage, setErrMessage] = useState(null);

  const dispatch = useDispatch();

  const formHandler = () => {
    const message = validateForm(
      email.current.value,
      password.current.value,
      full_name?.current?.value
    );

    setErrMessage(message);

    if (!message) {
      if (userType === "New") {
      } else {
      }
    }
  };

  const conatinerBgImg = {
    backgroundImage: "url( '" + BG_IMG + "')",
  };

  return (
    <div
      className="relative bg-cover bg-center min-h-screen"
      style={conatinerBgImg}
    >
      <Header />
      <div className="absolute top-0 left-0 bg-black opacity-60 w-full h-full"></div>
      <div
        className="absolute top-0 w-full
      flex justify-center items-center z-10 h-full"
      >
        <form
          className=" bg-black/80 p-8 flex flex-col w-10/12 xl:w-4/12"
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
