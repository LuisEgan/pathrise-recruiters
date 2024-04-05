"use client";

import { useRef, useState } from "react";
import ToggablePanel, { ToggablePanelRef } from "../Panels/ToggablePanel";
import { BaseProps } from "../types";

export type SelectOption<TValue = string | number> = {
  value: TValue;
  label?: string;
};
interface SelectProps extends BaseProps {
  options: Array<SelectOption>;
  placeholder?: string;
  multiple?: boolean;
  onChange?: (selectedOptions: Array<SelectOption>) => void;
  optionStyles?: React.CSSProperties;
}

const Select: React.FC<SelectProps> = (props) => {
  const {
    options,
    multiple,
    placeholder = "Select an option",
    onChange,
    optionStyles,
    ...baseProps
  } = props;

  const toggleRef = useRef<ToggablePanelRef>(null);
  const [label, setLabel] = useState<string>(placeholder);
  const [selectedOptionsIndexes, setSelectedOptionsIndexes] = useState<
    Array<number>
  >([]);

  const handleOptionClick = (index: number) => {
    let newSelectedOptionsIndexes = [...selectedOptionsIndexes];
    if (multiple) {
      const indexInSelectedOptions = newSelectedOptionsIndexes.indexOf(index);
      if (indexInSelectedOptions === -1) {
        newSelectedOptionsIndexes.push(index);
      } else {
        newSelectedOptionsIndexes.splice(indexInSelectedOptions, 1);
      }
      setLabel(`${placeholder} - ${newSelectedOptionsIndexes.length} selected`);
    } else {
      newSelectedOptionsIndexes = [index];
      setLabel(options[index].label || `${options[index].value}`);
      toggleRef.current?.toggle(false);
    }

    if (newSelectedOptionsIndexes.length === 0) setLabel(placeholder);

    newSelectedOptionsIndexes.sort();
    if (onChange) {
      onChange(newSelectedOptionsIndexes.map((i) => options[i]));
    }
    setSelectedOptionsIndexes(newSelectedOptionsIndexes);
  };

  return (
    <ToggablePanel
      ref={toggleRef}
      {...{ label, ...baseProps }}
      isBusy={!!selectedOptionsIndexes.length}
    >
      {options.map(({ label, value }, index) => (
        <div
          key={value}
          onClick={() => handleOptionClick(index)}
          className="flex items-center w-full h-9 px-3 py-2 bg-transparent text-white text-nowrap text-ellipsis overflow-hidden hover:bg-purple-300"
          style={optionStyles}
        >
          {multiple && (
            <div
              className={`w-4 h-4 mr-4 rounded-full outline outline-purple-50 ${
                selectedOptionsIndexes.includes(index) ? "bg-purple-50" : ""
              }`}
            ></div>
          )}
          <span className="w-4">{label || value}</span>
        </div>
      ))}
    </ToggablePanel>
  );
};

export default Select;
