export const capitalizeOnlyFirstLetter = (str = "") =>
  str.charAt(0).toUpperCase() + str.toLocaleLowerCase().slice(1);

export const extractBgColorFromClass = (str: string): string | null => {
  const regex = /bg-(\w+)-(\d{1,3})?/; // Regular expression to match bg-color-number pattern
  const match = str.match(regex); // Match the pattern in the string

  if (match && match[1]) {
    if (match[2]) {
      // If a number is specified
      const number = parseInt(match[2]);
      if (number >= 1 && number <= 900) {
        return match[0]; // Return the matched background color class
      }
    } else {
      return match[0]; // Return the matched background color class
    }
  }
  return null; // Return null if no match is found
};

// * generate random id string
export const generateRandomId = () =>
  Math.random().toString(36).substring(2, 9);
