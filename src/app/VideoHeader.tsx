"use client";

import useWindowSize from "@/utils/hooks/useWindowSize";
import PlayButtonIcon from "@svg/play-button.svg";

const VideoHeader = () => {
  const { width } = useWindowSize();
  const isMobile = width < 700;

  return (
    <div className="flex justify-center items-center mb-4 text-white text-sm md:text-black 2xl:mb-14">
      <PlayButtonIcon className={`mr-3 ${isMobile ? "svg-white" : "svg-black"} 2xl:scale-150 2xl:mr-7`} />
      <h1 className="text-md font-bold md:text-xl 2xl:text-6xl">6 Tips with a Pathrise Recruiter</h1>
    </div>
  );
};

export default VideoHeader;
