"use client";

import Image from "next/image";
import { useState } from "react";
import { BG_CLASSES, BORDER_CLASSES, ROUNDED_CLASSES } from "../constants";
import { BaseProps } from "../types";

interface ButtonProps
  extends BaseProps,
    React.ButtonHTMLAttributes<HTMLButtonElement> {
  ghost?: boolean;
  title: string;
  icon?: string | React.ReactNode;
  iconRight?: string | React.ReactNode;
  textColorClassName?: string;
  textSizeClassName?: string;
  hoverClassName?: string;
}

const Button: React.FC<ButtonProps> = (props) => {
  const {
    category = "main",
    ghost = false,
    rounded = "full",
    className = "",
    textColorClassName = "text-white",
    textSizeClassName = "text-sm lg:text-lg",
    hoverClassName = "hover:bg-purple-400",
    title,
    icon,
    iconRight,
    ...btnProps
  } = props;

  // Base classes for the button
  let baseClassNames = `h-10 font-medium select-none text-nowrap text-ellipsis overflow-hidden ${hoverClassName}`;
  baseClassNames += ` ${textSizeClassName}`;
  baseClassNames += `${
    !!iconRight ? " flex justify-between items-center px-5" : "px-2"
  }`;
  const lgClassNames = `lg:px-5 lg:h-12`;
  const xlClassNames = ``;

  // Ghost class
  const ghostClass = ghost
    ? `bg-transparent border ${BORDER_CLASSES[category]}`
    : BG_CLASSES[category];

  const [isClicking, setisClicking] = useState<boolean>(false);

  // Combine all classes
  const classes = `${baseClassNames} ${lgClassNames} ${xlClassNames} ${textColorClassName} ${ghostClass} ${
    ROUNDED_CLASSES[rounded]
  } ${className} ${isClicking ? "scale-95" : ""}`;

  // Handle mouse down event adding a clicking effect
  const onMouseDown = () => {
    setisClicking(true);
  };
  const onMouseUp = () => {
    setisClicking(false);
  };

  return (
    <button
      className={classes}
      {...btnProps}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
      {icon && typeof icon === "string" ? (
        <Image
          src={icon}
          className="mr-2 xl:w-8"
          alt="Button Icon"
          width={20}
          height={20}
        />
      ) : (
        icon
      )}

      <span>{title}</span>

      {iconRight && typeof iconRight === "string" ? (
        <Image
          src={iconRight}
          className="mr-2"
          alt="Button right Icon"
          width={20}
          height={20}
        />
      ) : (
        iconRight
      )}
    </button>
  );
};

export default Button;
