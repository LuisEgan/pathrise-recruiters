"use client";

import useIsFocusing from "@/utils/hooks/useIsFocusing";
import Chevron from "@svg/chevron-down.svg";
import {
  CSSProperties,
  ReactElement,
  cloneElement,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { BORDER_CLASSES, ROUNDED_CLASSES } from "../constants";
import { BaseProps } from "../types";

interface ToggablePanelProps extends BaseProps {
  ref?: React.Ref<ToggablePanelRef>;
  label?: string;
  multiple?: boolean;
  onToggle?: () => void;
  isBusy?: boolean;
  showRightIcon?: boolean;
  rightIcon?: ReactElement;
  leftIcon?: ReactElement;
  panelStyles?: CSSProperties;
  panelClassName?: string;
  focusClassNames?: "none" | string;
  hoverClassNames?: "none" | string;
  openPanelOffset?: {
    y?: number;
    x?: number;
  };
}

export interface ToggablePanelRef {
  toggle: (isClickFocusing: boolean) => void;
}

const ToggablePanel = forwardRef<ToggablePanelRef, ToggablePanelProps>(
  (props, ref) => {
    const {
      styles,
      category = "main",
      rounded = "md",
      className = "",
      showRightIcon = true,
      isBusy = false,
      rightIcon,
      leftIcon,
      label = "Select an option",
      onToggle,
      children,
      panelStyles,
      panelClassName,
      focusClassNames,
      hoverClassNames,
      openPanelOffset,
    } = props;

    const Icon = () => {
      const iconStyles = `pl-3 h-full ${
        isHovered ? "stroke-purple-500" : "stroke-gray-400"
      }`;
      return rightIcon ? (
        cloneElement(rightIcon, {
          className: `${rightIcon.props.className || ""} ${iconStyles}`,
        })
      ) : (
        <Chevron className={`${iconStyles}`} />
      );
    };

    const containerRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [showPanel, setShowPanel] = useState<boolean>(false);

    const toggle = (isClickFocusing: boolean) => {
      setShowPanel(isClickFocusing);
      if (onToggle) onToggle();
    };
    const handleMouseEnter = () => {
      setIsHovered(true);
    };
    const handleMouseLeave = () => {
      setIsHovered(false);
    };

    useIsFocusing(containerRef, toggle);
    useImperativeHandle(ref, () => ({
      toggle,
    }));

    const focusStyles =
      showPanel && focusClassNames !== "none"
        ? focusClassNames ?? "ring-2 ring-purple-500"
        : "";
    let dynamicStyles = `${className} ${
      BORDER_CLASSES[category]
    } ${focusStyles} ${showPanel ? "" : "overflow-hidden"}`;

    dynamicStyles += showPanel
      ? ` rounded-tl-lg rounded-tr-lg`
      : ` ${ROUNDED_CLASSES[rounded]}`;

    if ((isHovered || isBusy) && hoverClassNames !== "none") {
      dynamicStyles += ` ${hoverClassNames ?? "outline outline-purple-200"}`;
    }

    const xlClassNames = `2xl:h-20 2xl:text-lg`;

    return (
      <div
        ref={containerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`relative flex justify-between items-center w-full h-10 px-3 py-2 bg-gray-100 text-sm hover:cursor-pointer ${dynamicStyles} ${xlClassNames}`}
        style={styles}
      >
        {leftIcon}
        <div
          className={`w-full select-none text-nowrap text-ellipsis overflow-hidden ${
            isHovered || isBusy ? "text-purple-500" : "text-gray-400"
          }`}
        >
          {label}
        </div>
        {showRightIcon && <Icon />}

        {openPanelOffset?.y && (
          <div
            className={`${
              showPanel ? "visible" : "invisible"
            } absolute flex justify-between w-full z-20 bg-white top-full left-0`}
            style={{
              height: openPanelOffset.y + 0.1,
              boxShadow: "-2px 0px 0px 0px #4050bf, 2px 0px 0px 0px #4050bf",
            }}
          ></div>
        )}
        <div
          style={{
            ...panelStyles,
            marginTop: openPanelOffset?.y,
            marginLeft: openPanelOffset?.x,
          }}
          className={`${
            showPanel ? "visible" : "invisible"
          } absolute w-full z-10 min-h-[300%] rounded-bl-lg rounded-br-lg top-full left-0 bg-purple-500 ${focusStyles} ${panelClassName}`}
        >
          {children}
        </div>
      </div>
    );
  }
);

export default ToggablePanel;
