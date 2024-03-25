"use client";

import Fixed from "@/components/Fixed";
import LoadingSkeleton from "@/components/Loading/Skeleton";
import { BASE_ANIM } from "@/utils/constants";
import useWindowSize from "@/utils/hooks/useWindowSize";
import { capitalizeOnlyFirstLetter } from "@/utils/strings";
import ChevronIcon from "@svg/chevron-down.svg";
import DrawnArrowIcon from "@svg/drawn-arrow.svg";
import gsap from "gsap";
import Image from "next/image";
import { CSSProperties, useEffect, useMemo, useRef, useState } from "react";
import AnchorsList from "./AnchorsList";
import { ContentNavigator } from "./types";

const MobileNavigator = (props: ContentNavigator) => {
  const { company } = props;
  const IS_SSR = typeof window === "undefined";

  const { width } = useWindowSize();
  const isMobile = width < 700;

  const fixedTimeline = useRef<gsap.core.Timeline | null>(null);
  const expandedTimeline = useRef<gsap.core.Timeline | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const iconsContainerRef = useRef<HTMLDivElement>(null);

  const [show, setShow] = useState<boolean>(false);
  const [isFixed, setIsFixed] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const companyName = capitalizeOnlyFirstLetter(company.name);

  const onFixChange = useMemo(
    () => (isFixed: boolean) => {
      setIsFixed(isFixed);
      if (!isFixed) {
        setIsExpanded(false);
      }
    },
    []
  );

  const setFixedAnimTimeline = () => {
    if (!show) return;

    fixedTimeline.current = gsap.timeline({ paused: true });
    fixedTimeline.current
      .to(containerRef.current, {
        backgroundColor: "rgb(31 41 55)",
        color: "white",
        borderRadius: "10px",
      })
      .addLabel("containerBgChange")
      .to(
        iconsContainerRef.current,
        {
          borderRadius: "100px",
          backgroundColor: "orange",
        },
        "<"
      )
      .addLabel("iconsBgChange");
  };

  const setExpansionAnimTimeline = () => {
    if (!show) return;

    expandedTimeline.current = gsap.timeline({ paused: true });
    expandedTimeline.current
      .to(containerRef.current, {
        ...BASE_ANIM,
        height: "80vh",
      })
      .addLabel("containerHeightChange");
  };

  const toggleExpansion = () => {
    if (!isFixed) return;
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    setShow(isMobile);
  }, [isMobile]);

  useEffect(() => {
    if (!fixedTimeline.current) return;
    if (isFixed) {
      fixedTimeline.current.play();
    } else {
      if (fixedTimeline.current.progress() > 0) {
        fixedTimeline.current?.reverse("containerBgChange");
      }
    }
  }, [isFixed]);

  useEffect(() => {
    if (!expandedTimeline.current) return;
    if (isExpanded) {
      expandedTimeline.current.play();
    } else {
      if (expandedTimeline.current.progress() > 0) {
        expandedTimeline.current?.reverse("containerHeightChange");
      }
    }
  }, [isExpanded]);

  useEffect(() => {
    setFixedAnimTimeline();
    setExpansionAnimTimeline();

    return () => {
      if (fixedTimeline.current) {
        fixedTimeline.current.kill();
      }
      if (expandedTimeline.current) {
        expandedTimeline.current.kill();
      }
    };
  }, [show]);

  const fixedStyles: CSSProperties = isExpanded ? {} : {};

  if (IS_SSR || !show) return <LoadingSkeleton />;

  return (
    <Fixed
      ref={containerRef}
      onChange={onFixChange}
      styles={fixedStyles}
      fixWhenOffscreen
      offScreenOffset={{ top: -10 }}
      fixedOffset={{ top: 20 }}
      unfixWhenReturnToOriginalPosition
      className={`relative flex justify-between p-5 px-7 bg-orange-500 md:hidden`}
    >
      <div
        className={`no-scrollbar flex items-center w-3/4 h-full ${
          isFixed ? "flex-col" : ""
        }`}
      >
        {isFixed ? (
          <AnchorsList
            fullList
            className="no-scrollbar"
            id="list"
            onAnchorClick={toggleExpansion}
            disableAnchors={!isExpanded}
          />
        ) : (
          <>
            <div className="relative w-7 h-7">
              <Image
                className="absolute object-cover"
                src={"/png/image.png"}
                alt={"company logo"}
                fill
                sizes="100% 100%"
              />
            </div>
            <span className="text-xs ml-3">{companyName} Guide</span>
          </>
        )}
      </div>

      <div
        ref={iconsContainerRef}
        className={`flex justify-center items-center absolute right-7 ${
          isFixed ? "w-9 h-9 top-4" : "w-3 top-5"
        }`}
        onClick={toggleExpansion}
      >
        {isFixed ? (
          <ChevronIcon className="smooth-descend w-3/4 fill-white" />
        ) : (
          <DrawnArrowIcon className="w-full" />
        )}
      </div>
    </Fixed>
  );
};

export default MobileNavigator;
