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
}

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
    ...baseProps
  } = props;

  const containerRef = useRef<HTMLDivElement>(null);

  const [isFixed, setIsFixed] = useState<boolean>(false);
  const [originalRect, setOriginalRect] = useState<DOMRect>();

  const fixContainer = () => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const alwaysFix = !fixWhenOffscreenProp;
        const fixWhenOffscreen = fixWhenOffscreenProp && !entry.isIntersecting;

        if (alwaysFix) {
          setIsFixed(true);
          if (onFix) onFix();
          return;
        }
        if (entry.isIntersecting) return;

        if (fixWhenOffscreen && onFix) onFix();
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
    const isAboveOriginalPos = top <= originalRect.top;

    if (isFixed && unfixWhenReturnToOriginalPosition) {
      if (isAboveOriginalPos) {
        setIsFixed(false);
        if (onUnfix) onUnfix();
      }
    }
  };

  const updateOriginalRect = () => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setOriginalRect(rect);
    }
  };

  const getDimensionsPercentage = () => {
    // how much does the original container take up of the viewport
    if (!originalRect) return { height: 0, width: 0 };
    const viewportHeight = window.innerHeight;
    const containerHeight = originalRect.height;
    const height = (containerHeight / viewportHeight) * 100;

    const viewportWidth = window.innerWidth;
    const containerWidth = originalRect.width;
    const width = (containerWidth / viewportWidth) * 100;

    return { height, width };
  };

  // Forward the ref to the container div
  useEffect(() => {
    if (ref && typeof ref === "function") {
      ref(containerRef.current);
    } else if (ref) {
      ref.current = containerRef.current;
    }
  }, [ref]);

  useEffect(() => {
    updateOriginalRect();
    fixContainer();
  }, []);

  useEffect(() => {
    document.addEventListener("scroll", unfixContainer);
    window.addEventListener("resize", updateOriginalRect);
    return () => {
      document.removeEventListener("scroll", unfixContainer);
      window.removeEventListener("resize", updateOriginalRect);
    };
  }, [originalRect, isFixed]);

  let fixedStyles: CSSProperties = {};

  if (isFixed) {
    const { height, width } = getDimensionsPercentage();

    fixedStyles = {
      position: "fixed",
      top: `${fixedOffset?.top ?? 0}px`,
      zIndex: 1000,
      width: `${width}vw`,
      height: `${height}vh`,
    };

    if (fixedOffset?.left) {
      fixedStyles.left = `${fixedOffset.left}px`;
    }
  }

  const className = `${classNameProp} ${isFixed ? "smooth-descend" : ""}`;

  return (
    <div
      ref={containerRef}
      {...baseProps}
      style={{ ...fixedStyles, ...styles }}
      className={`${className}`}
    >
      {children}
    </div>
  );
});

export default Fixed;
