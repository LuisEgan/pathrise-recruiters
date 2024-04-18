"use client";

import { createRef, useEffect, useState } from "react";
import { ReactPlayerProps } from "react-player";
import ReactPlayer from "react-player/lazy";
import LoadingSkeleton from "../Loading/Skeleton";
import Button from "../Button";
import { SKIP_BUTTONS } from "./constants";
import { BaseProps } from "../types";

interface VideoPlayerProps extends BaseProps, ReactPlayerProps {
  showSkipControls?: boolean;
  header?: string | React.ReactNode;
  playerContainerClassName?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = (props) => {
  const {
    className = "",
    playerContainerClassName = "",
    showSkipControls,
    header,
    ...videoProps
  } = props;

  const [isClient, setIsClient] = useState(false);
  const videoRef = createRef<ReactPlayer>();

  const videoBgMdStyles =
    "md:top-[unset] md:left-[unset] md:h-[90%] md:w-[90%] md:right-0 md:bottom-0";

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSkip = (skipTo: number) => {
    if (videoRef.current) {
      videoRef.current.seekTo(skipTo);
      videoRef.current.getInternalPlayer().playVideo();
    }
  };

  const renderHeader = () => {
    if (!header) return null;
    if (typeof header === "string") {
      return <div className="relative text-center mb-4 z-10">{header}</div>;
    }
    return <div className="relative z-10">{header}</div>;
  };

  if (!isClient) {
    return <LoadingSkeleton className="h-40" />;
  }

  return (
    <div className={`${className}`}>
      {renderHeader()}

      <div className={`relative ${playerContainerClassName}`}>
        <div className="relative h-full w-full rounded-lg overflow-hidden z-10 md:h-[95%] md:w-[95%]">
          <ReactPlayer
            {...videoProps}
            controls
            ref={videoRef}
            width="100%"
            height="100%"
          />
        </div>
        <div
          className={`absolute w-[105%] h-[110%] bg-gray-800 rounded-2xl -top-24 -left-[2.5%] ${videoBgMdStyles}`}
        ></div>
      </div>

      {showSkipControls && (
        <div className="flex mt-10 w-full flex-wrap">
          {SKIP_BUTTONS.map(({ skipTo, title }) => (
            <Button
              rounded="lg"
              key={title}
              title={title}
              textColorClassName="text-black"
              hoverClassName="hover:bg-gray-200"
              className="mr-3 mt-3 px-3 bg-white border border-black font-bold md:w-[unset]"
              onClick={handleSkip.bind(null, skipTo)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
