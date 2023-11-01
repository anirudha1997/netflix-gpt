import React, { useState } from "react";

const Login = () => {
  const [userType, setUserType] = useState("Old");
  return (
    <div className="relative">
      <img
        src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
        alt="netflix-logo"
        className="w-2/12 absolute z-10"
      />
      <img
        src="https://assets.nflxext.com/ffe/siteui/vlv3/dace47b4-a5cb-4368-80fe-c26f3e77d540/f5b52435-458f-498f-9d1d-ccd4f1af9913/IN-en-20231023-popsignuptwoweeks-perspective_alpha_website_large.jpg"
        className="h-full min-h-screen"
        alt="background-img"
      />
      <div className="absolute top-0 left-0 bg-black opacity-50 w-full h-full"></div>
      <div
        className="absolute top-0 w-full
      flex justify-center items-center z-10 h-full"
      >
        <form className=" bg-black/80 p-8 flex flex-col w-4/12">
          <p className="text-3xl font-bold text-white my-4">
            {userType === "Old" ? "Sign In" : "Sign Up"}
          </p>

          {userType === "New" && (
            <input
              type="text"
              name="full name"
              placeholder="Email your full name"
              className="text-white my-2 py-4 px-4 rounded-md bg-slate-800 placeholder:text-white"
            ></input>
          )}
          <input
            type="text"
            name="email"
            placeholder="Email or phone number"
            className="text-white my-2 py-4 px-4 rounded-md bg-slate-800 placeholder:text-white"
          ></input>
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="text-white my-2 py-4 px-4 rounded-md bg-slate-800 placeholder:text-white"
          ></input>
          <button className="p-4 bg-red-700 rounded-md font-bold text-white my-6 text-xl">
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
