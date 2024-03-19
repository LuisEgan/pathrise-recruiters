"use client";

import SocialNetwork from "@/components/Button/SocialNetwork";
import Fixed from "@/components/Fixed";
import { capitalizeOnlyFirstLetter } from "@/utils/strings";
import LogoIcon from "@svg/pathrise-logo.svg";
import LogoPIcon from "@svg/pathrise-p.svg";
import RocketshipIcon from "@svg/rocketship.svg";
import gsap from "gsap";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { COMPANY_SECTIONS } from "../contants";
import { ContentNavigator } from "./types";
import useWindowSize from "@/utils/hooks/useWindowSize";
import LoadingSkeleton from "@/components/Loading/Skeleton";
import { BASE_ANIM, BASE_FADE_IN_ANIM } from "@/utils/constants";
import AnchorsList from "./AnchorsList";

const DesktopNavigator = (props: ContentNavigator) => {
  const { company } = props;
  const { width } = useWindowSize();

  const IS_SSR = typeof window === "undefined";
  const isMobile = width < 700;

  const companyName = capitalizeOnlyFirstLetter(company.name);

  const timeline = useRef<gsap.core.Timeline | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const companyLogoRef = useRef<HTMLDivElement>(null);
  const bottomBgRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const pRef = useRef<HTMLDivElement>(null);
  const igRef = useRef<HTMLAnchorElement>(null);
  const linkedinRef = useRef<HTMLAnchorElement>(null);
  const shareRef = useRef<HTMLAnchorElement>(null);

  const [show, setShow] = useState<boolean>(false);
  const [isFixed, setIsFixed] = useState<boolean>(false);

  const onFix = useMemo(() => () => setIsFixed(true), []);
  const onUnfix = useMemo(() => () => setIsFixed(false), []);

  const setAnimTimeline = useMemo(
    () => () => {
      if (!show) return;

      timeline.current = gsap.timeline({ paused: true });
      timeline.current
        .to(containerRef.current, {
          backgroundColor: "rgb(31 41 55)",
          color: "white",
        })
        .addLabel("containerBgChange")
        .to(
          bottomBgRef.current,
          {
            ...BASE_ANIM,
            backgroundColor: "#FF4500",
            skewX: -20,
            x: "-43%",
          },
          "<"
        )
        .addLabel("companyContainerSkew")
        .to(logoRef.current, {
          ...BASE_ANIM,
          left: "75%",
        })
        .addLabel("logoMove")
        .fromTo(
          [pRef.current, companyLogoRef.current],
          BASE_FADE_IN_ANIM.from,
          BASE_FADE_IN_ANIM.to,
          "<"
        )
        .addLabel("namesFadeIn")
        .fromTo(
          [shareRef.current, igRef.current, linkedinRef.current],
          BASE_FADE_IN_ANIM.from,
          {
            ...BASE_FADE_IN_ANIM.to,
            stagger: 0.1,
          }
        )
        .addLabel("socialsFadeIn");
    },
    []
  );

  useEffect(() => {
    setShow(!isMobile);
  }, [isMobile]);

  useEffect(() => {
    if (!timeline.current) return;
    if (isFixed) {
      timeline.current.play();
    } else {
      if (timeline.current.progress() > 0) {
        timeline.current?.reverse("namesFadeIn");
      }
    }
  }, [isFixed]);

  useEffect(() => {
    setAnimTimeline();

    return () => {
      // Clean up the timeline on unmount
      if (timeline.current) {
        timeline.current.kill();
      }
    };
  }, [show]);

  if (IS_SSR || !show) return <LoadingSkeleton />;

  return (
    <Fixed
      onFix={onFix}
      onUnfix={onUnfix}
      fixWhenOffscreen
      offScreenOffset={{ top: -100 }}
      unfixWhenReturnToOriginalPosition
      className="absolute -bottom-10 2xl:-bottom-20"
    >
      <div className="flex flex-col mt-10 w-full text-xs xl:text-lg 2xl:text-2xl">
        <div className="flex items-center mb-3">
          <RocketshipIcon
            className={`w-6 mr-3 2xl:w-12 2xl:mr-7 xl:mb-5 ${
              isFixed ? "svg-black" : "svg-white"
            }`}
          />
          <span
            className={`2xl:text-3xl font-bold ${
              isFixed ? "text-black" : "text-white"
            }`}
          >
            In this guide for {companyName}
          </span>
        </div>

        <div
          ref={containerRef}
          className="flex flex-col justify-between overflow-hidden bg-gray-100 rounded-lg text-black"
        >
          <AnchorsList fullList={isFixed} className="p-7 max-h-[50vh]" />

          <div className="relative flex items-center h-10 px-5 bg-purple-500 rounded-none 2xl:px-10 2xl:h-20">
            <div
              ref={companyLogoRef}
              className="flex items-center h-[75%] w-full z-10 text-white opacity-0"
            >
              <div className="relative z-10 svg-white w-8 h-full mr-2 xl:w-16 2xl:w-36">
                <Image
                  className="absolute object-cover"
                  src={"/png/image.png"}
                  alt={"company logo"}
                  fill
                  sizes="100% 100%"
                />
              </div>

              <span className="overflow-hidden overflow-ellipsis text-nowrap w-[35%]">
                Reddit
              </span>
            </div>

            <div
              ref={logoRef}
              className="absolute left-5 z-10 svg-white w-12 xl:w-16 2xl:w-36"
            >
              <LogoIcon className="w-full h-full" />
            </div>
            <div
              ref={pRef}
              className="absolute opacity-0 left-[65%] z-10 svg-white w-4 2xl:w-8"
            >
              <LogoPIcon className="w-full h-full" />
            </div>
            <div
              ref={bottomBgRef}
              className="absolute w-full h-full bg-gray-800 left-0 top-0 z-0"
            ></div>
          </div>
        </div>

        <div className={`svg-black mt-5 ${isFixed ? "flex" : "hidden"}`}>
          <SocialNetwork ref={shareRef} className="mr-3" network="share" />
          <SocialNetwork ref={igRef} className="mr-3" network="instagram" />
          <SocialNetwork ref={linkedinRef} network="linkedin" />
        </div>
      </div>
    </Fixed>
  );
};

export default DesktopNavigator;
