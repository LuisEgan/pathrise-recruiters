import React, { useEffect, useState } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 */
const useIsFocusing = (
  ref: React.RefObject<HTMLElement>,
  cb?: (isFocusing: boolean) => void
) => {
  const [isFocusing, seFocusing] = useState<boolean>(false);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const isClickFocusing = !!ref?.current?.contains(event.target as Node);
      if (cb) {
        cb(isClickFocusing);
      } else {
        seFocusing(isClickFocusing);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, isFocusing]);
  return isFocusing;
};

export default useIsFocusing;
