import React, { useEffect } from "react";
import unmuted_icon from "../assets/images/unmute_icon.png";
import muted_icon from "../assets/images/mute_icon.png";
import { useDispatch, useSelector } from "react-redux";
import { toggleMuteStatus } from "../utils/appConfigSlice";

const MainMovieInfo = ({ title, description }) => {
  const dispatch = useDispatch();
  const muteStatus = useSelector((store) => store.appConfig.muteStatus);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Tab is not active, mute
        dispatch(toggleMuteStatus(true));
      } else {
        // Tab is active, unmute
        dispatch(toggleMuteStatus(false));
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [dispatch]);
  return (
    <div className="w-screen bg-gradient-to-r from-black to-black xl:to-transparent aspect-video pt-[60%] md:pt-[50%] md:pb-[5%] xl:pt-[15%] pl-10 z-10 flex justify-between items-center">
      <div className="w-8/12 relative z-20 xl:w-5/12">
        <h1 className="text:2xl xl:text-5xl font-bold text-white mb-3">
          {title}
        </h1>
        <p className="text-xl text-white mb-3 hidden xl:block">{description}</p>
        <div className="flex items-center mt-5">
          <button className="px-4 py-2 bg-white font-semibold rounded-sm cursor-pointer text-xs md:text-base xl:text-xl">
            ▶️ Play
          </button>
          <button className="ml-3 px-4 py-2 bg-gray-600 text-white font-semibold rounded-sm cursor-pointer text-xs md:text-base xl:text-xl">
            ⓘ More Info
          </button>
        </div>
      </div>
      <div className="w-8/12 relative z-20 flex justify-end pr-[5%] xl:w-5/12">
        <button
          onClick={() => {
            dispatch(toggleMuteStatus());
          }}
        >
          <img
            src={muteStatus ? muted_icon : unmuted_icon}
            className="max-h-6 md:max-h-8"
            alt="unmute"
          />
        </button>
      </div>
    </div>
  );
};

export default MainMovieInfo;
