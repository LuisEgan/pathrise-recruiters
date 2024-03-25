"use client";

import { BaseProps } from "@/components/types";
import { useEffect, useRef, useState } from "react";
import { COMPANY_SECTIONS } from "../contants";

interface AnchorsList extends BaseProps {
  fullList?: boolean;
  onAnchorClick?: (id: string) => void;
  disableAnchors?: boolean;
  listScrollTopOffset?: number;
}

const OBSERVE_IDS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const PARTIAL_LIST = 3;
let scrollTimeout: NodeJS.Timeout;
let scrolledToSection = false;

const AnchorsList = (props: AnchorsList) => {
  const {
    fullList,
    className: classNameProp = "",
    onAnchorClick,
    disableAnchors,
    listScrollTopOffset = 0,
  } = props;

  const containerRef = useRef<HTMLDivElement>(null);

  const [activeSection, setActiveSection] = useState<string>("");

  const scrollAnchorList = (sectionId: string, delay = 500) => {
    if (!sectionId) return;

    setTimeout(
      () => {
        const anchor = document.querySelector(`[data-anchor="${sectionId}"]`);
        const anchorTop = anchor?.getBoundingClientRect().top || 0;
        const containerTop =
          containerRef.current?.getBoundingClientRect().top || 0;
        const distanceToParentTop = anchorTop - containerTop;

        containerRef.current?.scrollBy({
          top: distanceToParentTop + listScrollTopOffset,
          behavior: "smooth",
        });
      },
      scrolledToSection ? 700 : delay
    );
  };

  const scrollToSection = (id: string) => {
    if (disableAnchors) return;

    const el = document.querySelector(`[data-section="${id}"]`);
    if (el) {
      scrolledToSection = true;
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      setActiveSection(id);
    }

    if (onAnchorClick) onAnchorClick(id);
  };

  // * Set section observers
  useEffect(() => {
    const observe = new IntersectionObserver(
      ([entry]) => {
        if (scrolledToSection) return;
        if (entry.isIntersecting) {
          const section = entry.target;
          const sectionId = section.getAttribute("data-section");
          setActiveSection(`${sectionId}`);
        }
      },
      {
        rootMargin: `-${window.innerHeight / 3}px 0px -${
          window.innerHeight / 3
        }px 0px`,
        threshold: 0,
      }
    );

    OBSERVE_IDS.forEach((id) => {
      const el = document.querySelector(`[data-section="${id}"]`);
      if (el) observe.observe(el);
    });

    return () => {
      OBSERVE_IDS.forEach((id) => {
        const el = document.querySelector(`[data-section="${id}"]`);
        if (el) observe.unobserve(el);
      });
    };
  }, []);

  // * Set event listeners
  useEffect(() => {
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(function () {
        scrolledToSection = false;
      }, 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    scrollAnchorList(activeSection, 0);
  }, [activeSection]);

  const SECTIONS = fullList
    ? COMPANY_SECTIONS
    : COMPANY_SECTIONS.slice(0, PARTIAL_LIST);
  const className = `flex flex-col overflow-y-auto ${classNameProp}`;

  return (
    <div id="parent" ref={containerRef} className={className}>
      {SECTIONS.map((section, index) => (
        <span
          key={index}
          className={`mb-3 cursor-pointer ${
            fullList && +activeSection === index ? "text-orange-500" : ""
          }`}
          data-anchor={`${index}`}
          onClick={scrollToSection.bind(null, `${index}`)}
        >
          {index + 1}.{" "}
          {typeof section === "function" ? section("reddit") : section}
        </span>
      ))}

      {!fullList && (
        <span className="text-xs">
          + {COMPANY_SECTIONS.length - PARTIAL_LIST} more
        </span>
      )}
    </div>
  );
};

export default AnchorsList;
