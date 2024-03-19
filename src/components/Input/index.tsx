"use client";

import { useState } from "react";
import { BORDER_CLASSES, ROUNDED_CLASSES } from "../constants";
import InputIcon, { Icon } from "./InputIcon";
import { BaseProps } from "../types";

interface InputProps
  extends BaseProps,
    React.InputHTMLAttributes<HTMLInputElement> {
  iconLeft?: Icon;
  iconRight?: Icon;
}

const Input: React.FC<InputProps> = (props) => {
  const {
    category = "main",
    rounded = "md",
    className = "",
    iconLeft,
    iconRight,
    ...inputProps
  } = props;

  const [isFocused, setIsFocused] = useState<boolean>(false);

  const focusClasses = isFocused ? "ring-2 ring-offset-2 ring-purple-200" : "";
  const xlClassNames = `2xl:h-20 2xl:text-lg`;

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    if (inputProps.onFocus) inputProps.onFocus(e);
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    if (inputProps.onBlur) inputProps.onBlur(e);
  };

  return (
    <div
      className={`${className} ${xlClassNames} ${BORDER_CLASSES[category]} ${ROUNDED_CLASSES[rounded]} ${focusClasses} text-sm h-10 w-full px-3 py-2 bg-white flex`}
    >
      <InputIcon icon={iconLeft} side="left" />
      <input
        className={`w-full focus:outline-none`}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...inputProps}
      />
      <InputIcon icon={iconRight} side="right" />
    </div>
  );
};

export default Input;
