"use client";

import { useEffect, useRef } from "react";
import { BaseProps } from "../types";

// * The intersection observer will be used to detect when certain % of the element is in the viewport
// * For more information regarding the Intersection Observer API, visit:
// * https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#creating_an_intersection_observer

interface Observer extends BaseProps {
  children: React.ReactNode;
  observerAttribute?: string;
  observeValue?: string;
  intersectThreshold?: number | Array<number>;
  onIntersect?: (attr: string) => void;
  onUnintersect?: (attr: string) => void;
}

const Observer = (props: Observer) => {
  const {
    children,
    intersectThreshold = 0,
    onIntersect,
    onUnintersect,
    observerAttribute = "id",
    observeValue,
    ...baseProps
  } = props;

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const observe = new IntersectionObserver(
      ([entry]) => {
        const attrValue = entry.target.getAttribute(observerAttribute);
        if (entry.isIntersecting) {
          if (onIntersect) onIntersect(`${attrValue}`);
        } else {
          if (onUnintersect) onUnintersect(`${attrValue}`);
        }
      },
      { rootMargin: "0px", threshold: intersectThreshold }
    );

    containerRef.current
      .querySelectorAll(`[${observerAttribute}=${observeValue}]`)
      .forEach((el) => {
        observe.observe(el);
      });

    return () => {
      if (!containerRef.current) return;
      containerRef.current
        .querySelectorAll(`[${observerAttribute}]`)
        .forEach((el) => {
          observe.unobserve(el);
        });
    };
  }, []);

  return (
    <div ref={containerRef} {...baseProps}>
      {children}
    </div>
  );
};

export default Observer;
