"use client";

import { CSSProperties, forwardRef, useEffect, useRef, useState } from "react";
import { BaseProps } from "../types";

interface Fixed extends BaseProps {
  fixWhenOffscreen?: boolean;
  unfixWhenReturnToOriginalPosition?: boolean;
  offScreenOffset?: { top?: number; bottom?: number };
  fixedOffset?: { top?: number; left?: number };
  onFix?: () => void;
  onUnfix?: () => void;
  onChange?: (isFixed: boolean) => void;

  // * Element that will stop the fixed element from scrolling down
  bottomLimitElementId?: string;
}

let hasBeenFixed = false;
const Fixed = forwardRef<HTMLDivElement, Fixed>((props, ref) => {
  const {
    fixWhenOffscreen: fixWhenOffscreenProp = false,
    unfixWhenReturnToOriginalPosition = false,
    offScreenOffset,
    fixedOffset,
    styles,
    children,
    className: classNameProp,
    onFix,
    onUnfix,
    onChange,
    bottomLimitElementId,
    ...baseProps
  } = props;

  const containerRef = useRef<HTMLDivElement>(null);

  const [isFixed, setIsFixed] = useState<boolean>(false);
  const [originalRect, setOriginalRect] = useState<DOMRect>();
  const [originalTopDistance, setOriginalTopDistance] = useState<number>(0);
  const [originalParent, setOriginalParent] = useState<Node | null>();
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const fixContainer = () => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const alwaysFix = !fixWhenOffscreenProp;
        let fixWhenOffscreen = fixWhenOffscreenProp && !entry.isIntersecting;

        // * If there's a limit element, don't fix if the scollTop is below it
        // * this is a check for if the user refreshes the page whilst having scroll past the limit element
        if (bottomLimitElementId) {
          const limitElem = document.getElementById(bottomLimitElementId);
          if (limitElem) {
            const limitElemTop =
              limitElem.getBoundingClientRect().top + window.scrollY;
            fixWhenOffscreen =
              fixWhenOffscreen && limitElemTop > window.scrollY;
          }
        }

        if (alwaysFix) {
          setIsFixed(true);
          if (onFix) onFix();
          if (onChange) onChange(true);
          return;
        }
        if (entry.isIntersecting) return;

        if (fixWhenOffscreen) {
          if (onFix) onFix();
          if (onChange) onChange(true);
        }
        setIsFixed(fixWhenOffscreen);
      },
      {
        rootMargin: `${offScreenOffset?.top ?? 0}px 0px ${
          offScreenOffset?.bottom ?? 0
        }px 0px`,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  };

  const unfixContainer = () => {
    if (!containerRef.current || !originalRect || !fixWhenOffscreenProp) return;
    const top =
      containerRef.current.getBoundingClientRect().top + window.scrollY;
    const isAboveOriginalPos = top <= originalTopDistance;

    if (isFixed && unfixWhenReturnToOriginalPosition) {
      if (isAboveOriginalPos) {
        setIsFixed(false);
        if (onUnfix) onUnfix();
        if (onChange) onChange(false);
      }
    }
  };

  const pauseFromScrolling = () => {
    // * Check if the bottom limit element is in view
    if (bottomLimitElementId) {
      const limitElem = document.getElementById(bottomLimitElementId);
      if (!limitElem) return;
      if (!hasBeenFixed) return;

      const { top } = limitElem?.getBoundingClientRect() || { top: Infinity };
      const hasLimitElemBeenReached = top <= window.innerHeight;

      setIsPaused((wasPaused) => {
        if (!containerRef.current) return wasPaused;

        const pause = hasLimitElemBeenReached && !wasPaused;
        if (pause) {
          // * Get current position of containerRef
          const { left } = containerRef.current.getBoundingClientRect();
          containerRef.current.style.left = `${left}px`;
          containerRef.current.style.position = "absolute";
          containerRef.current.style.top = `${window.scrollY}px`;
          // * Make containerRef child of body
          document.body.appendChild(containerRef.current as Node);
        }

        return hasLimitElemBeenReached;
      });
    }
  };

  const updateOriginalValues = () => {
    if (containerRef.current) {
      const container = containerRef.current;
      const boundingClient = container.getBoundingClientRect();
      setOriginalRect(boundingClient);
      setOriginalTopDistance(boundingClient.top + window.scrollY);
      setOriginalParent(container.parentElement);
    }
  };

  const getDimensionsPercentage = () => {
    // * How much does the original container take up of the viewport
    if (!originalRect) return { height: 0, width: 0 };
    const viewportHeight = window.innerHeight;
    const containerHeight = originalRect.height;
    const height = (containerHeight / viewportHeight) * 100;

    const viewportWidth = window.innerWidth;
    const containerWidth = originalRect.width;
    const width = (containerWidth / viewportWidth) * 100;

    return { height, width };
  };

  // * Forward ref
  useEffect(() => {
    if (ref && typeof ref === "function") {
      ref(containerRef.current);
    } else if (ref) {
      ref.current = containerRef.current;
    }
  }, [ref]);

  // * Initial setup
  useEffect(() => {
    updateOriginalValues();
    fixContainer();
  }, []);

  // * Event listeners
  useEffect(() => {
    document.addEventListener("scroll", unfixContainer);
    document.addEventListener("scroll", pauseFromScrolling);
    window.addEventListener("resize", updateOriginalValues);
    return () => {
      document.removeEventListener("scroll", unfixContainer);
      document.removeEventListener("scroll", pauseFromScrolling);
      window.removeEventListener("resize", updateOriginalValues);
    };
  }, [originalRect, isFixed]);

  // * Reset container position when unpaused
  useEffect(() => {
    if (!isPaused) {
      // check if containerRef is child of originalParent
      if (
        originalParent &&
        containerRef.current?.parentNode !== originalParent
      ) {
        originalParent.appendChild(containerRef.current as Node);
      }
    }
  }, [isPaused]);

  useEffect(() => {
    hasBeenFixed = hasBeenFixed || isFixed;
  }, [isFixed]);

  let dynamicStyles: CSSProperties = { left: 0 };

  if (isFixed) {
    const { height, width } = getDimensionsPercentage();

    dynamicStyles = {
      position: isPaused ? "absolute" : "fixed",
      zIndex: 1000,
      width: `${width}vw`,
      height: `${height}vh`,
      top: isPaused ? window.scrollY : `${fixedOffset?.top ?? 0}px`,
    };

    if (fixedOffset?.left) {
      dynamicStyles.left = `${fixedOffset.left}px`;
    }
  }

  const isAboveTop =
    (containerRef.current?.getBoundingClientRect().top || 0) < 0;
  const className = `${classNameProp} ${
    isFixed && !isPaused && isAboveTop ? "smooth-descend" : ""
  }`;

  return (
    <div
      ref={containerRef}
      {...baseProps}
      style={{ ...dynamicStyles, ...styles }}
      className={`${className}`}
    >
      {children}
    </div>
  );
});

Fixed.displayName = "Fixed";

export default Fixed;
