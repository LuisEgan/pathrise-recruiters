"use client"

import Lottie from "react-lottie";
import * as loadingAnim from "./loadingAnim.json";

const LoadingAnim = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingAnim,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return <Lottie options={defaultOptions} height={300} width={300} />;
};

export default LoadingAnim;
