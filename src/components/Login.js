import React, { useRef, useState } from "react";
import Header from "./Header";
import { validateForm } from "./../utils/validate";
import { BG_IMG } from "./../utils/conatants";
import { auth } from "../utils/conatants";
import { useNavigate } from "react-router-dom";
import user_icon from "../assets/images/user-icon.png";

const Login = () => {
  const [userType, setUserType] = useState("Old");
  const email = useRef(null);
  const password = useRef(null);
  const full_name = useRef(null);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const formHandler = async () => {
    const message = validateForm(
      email.current.value,
      full_name?.current?.value
    );

    setMessage({ text: message, type: "error" });
    if (!message) {
      if (userType === "New") {
        try {
          await auth.signup(email.current.value, password.current.value, {
            full_name: full_name?.current?.value,
            avatar_url: user_icon,
          });
          setMessage({
            text: "Thank you for signing up! Please proceed to sign in now.",
            type: "success",
          });
        } catch (error) {
          setMessage({ text: error.message, type: "error" });
        }
      } else {
        try {
          await auth.login(email.current.value, password.current.value, true);
          navigate("/browse");
        } catch (error) {
          setMessage({ text: error.message, type: "error" });
        }
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
          <p
            className={
              "font-semibold my-2 " +
              (message?.type === "error" ? "text-red-600" : "text-blue-500")
            }
          >
            {message?.text}
          </p>
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
