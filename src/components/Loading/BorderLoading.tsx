import { extractBgColorFromClass } from "@/utils/strings";
import { BaseProps } from "../types";

interface BorderLoading extends BaseProps {
  isLoading: boolean;
}

const BorderLoading = (props: BorderLoading) => {
  const { isLoading, className = "", children, ...baseProps } = props;

  const bgColor = extractBgColorFromClass(className) || "bg-gray-300";

  return (
    <div
      className={`loading-border-container ${bgColor} ${
        isLoading ? "loading-border" : ""
      }  ${className}`}
      {...baseProps}
    >
      <div className={`h-[98%] w-[98%] overflow-y-auto ${bgColor}`}>{children}</div>
    </div>
  );
};

export default BorderLoading;
